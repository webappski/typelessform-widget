import { loadTranslations, preloadTranslations, SUPPORTED_LANGUAGES } from '../translations/index.js';
import type { SupportedLanguage } from '../translations/index.js';
import type { FieldDescriptor } from '../form-scanner/index.js';
import { CONFIG } from '../constants/config.ts';
import { apiFetch } from '../utils/api-fetch.ts';

type Lang = string; // ISO-639-1

interface AifcGuard { phase: string }
interface AifcState { formName?: string; formLanguage?: string }

export class TranslationService {
    private currentLang: Lang = CONFIG.DEFAULT_LANG;
    private translations: Record<string, string> = {};
    private inferredFormName: string | null = null;

    private apiKey: string | null = null;
    private _phraseCache = new Map<string, string>();
    constructor(apiKey?: string) {
        this.apiKey = apiKey ?? null;
    }

    /** Update API key at runtime (used when api-key attribute is set on the widget) */
    setApiKey(key: string | undefined): void {
        this.apiKey = key ?? null;
    }
    
    getInferredFormName(): string | null {
        // Zero-Delta: Check initAnalyzeV2 state first
        const state = (window as unknown as { __aifc_state?: AifcState }).__aifc_state;
        if (state?.formName) {
            return state.formName;
        }
        return this.inferredFormName;
    }

    async smartTranslate(text: string, targetLang: string): Promise<string> {
        if (!text) {return text;}

        const cacheKey = `${text}::${targetLang}`;
        const cached = this._phraseCache.get(cacheKey);
        if (cached) {return cached;}

        // Один короткий prompt → GPT
        const translated = await this.translateText(text, targetLang);
        this._phraseCache.set(cacheKey, translated);
        return translated;
    }

    /** Универсальный перевод короткой фразы (до 100-150 симв.) */
    private async translateText(text: string, targetLang: string): Promise<string> {
        if (!this.apiKey) {
            return text;
        }

        try {
            const res = await apiFetch(CONFIG.TRANSLATE_TEXT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text,
                    targetLang
                })
            });

            const data = await res.json();
            const translated = (data.reply || '').trim();
            return translated || text;        // fallback: если GPT вернул пусто
        } catch (_err) {
            return text;                      // fallback: оригинальный текст
        }
    }

    async initialize(): Promise<void> {
        const browserLang = navigator.language.split('-')[0];
        this.currentLang =
            SUPPORTED_LANGUAGES.includes(browserLang as SupportedLanguage)
                ? browserLang
                : CONFIG.DEFAULT_LANG;

        await this.loadTranslations(this.currentLang);
    }

    private async loadTranslations(lang: Lang): Promise<void> {
        try {
            this.translations = await loadTranslations(lang);

            // Preload fallback language in background if not already loaded
            if (lang !== CONFIG.DEFAULT_LANG) {
                preloadTranslations(CONFIG.DEFAULT_LANG);
            }
        } catch (error) {
            console.error(`Failed to load translations for ${lang}:`, error);
            // Fallback to default language on error
            if (lang !== CONFIG.DEFAULT_LANG) {
                this.translations = await loadTranslations(CONFIG.DEFAULT_LANG);
            }
        }
    }

    t(key: string, params?: Record<string, string | number>): string {
        let txt = this.translations[key] ?? key;
        if (params) {
            for (const [k, v] of Object.entries(params))
                {txt = txt.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));}
        }
        return txt;
    }


    /** ───────── GPT-определение языка на основе ВСЕХ полей формы ──────── */
    async detectFormLanguage(fields: FieldDescriptor[]): Promise<Lang> {
        if (!fields || fields.length === 0) {
            return CONFIG.DEFAULT_LANG;
        }

        // Собираем ВСЕ текстовые данные формы для анализа
        const formData = this.collectAllFormData(fields);
        if (import.meta.env.DEV) {
            console.log('[LANG_DETECT] formData sent to GPT:\n', formData);
        }

        if (!formData.trim()) {
            if (import.meta.env.DEV) { console.log('[LANG_DETECT] formData is empty → fallback to', CONFIG.DEFAULT_LANG); }
            return CONFIG.DEFAULT_LANG;
        }

        return await this.askGptForLanguage(formData);
    }

    /** Collect text properties from a single field */
    private collectFieldTextProps(field: FieldDescriptor): string[] {
        const parts: string[] = [];
        if (field.label) {parts.push(`Label: "${field.label}"`);}
        if (field.placeholder) {parts.push(`Placeholder: "${field.placeholder}"`);}
        if (field.element?.title) {parts.push(`Title: "${field.element.title}"`);}
        if (field.ariaLabel) {parts.push(`AriaLabel: "${field.ariaLabel}"`);}
        if (field.type) {parts.push(`Type: ${field.type}`);}
        if (Array.isArray(field.options)) {
            const texts = field.options.map(o => o.label || o.value).filter(Boolean).slice(0, 3);
            if (texts.length > 0) {parts.push(`Options: [${texts.join(', ')}]`);}
        }
        return parts;
    }

    /** Collect all text data from form fields */
    private collectAllFormData(fields: FieldDescriptor[]): string {
        return fields
            .map((field, i) => {
                const parts = this.collectFieldTextProps(field);
                return parts.length > 0 ? `Field ${i + 1}: ${parts.join(', ')}` : '';
            })
            .filter(Boolean)
            .join('\n');
    }

    getCurrentLang(): Lang { return this.currentLang; }


    /** GPT анализ всех полей формы для определения языка */
    private async askGptForLanguage(formData: string): Promise<Lang> {
        // Zero-Delta: Block ALL network calls before trigger click
        const g = (window as unknown as { __aifc_guard?: AifcGuard }).__aifc_guard;
        if (!g || g.phase !== 'open') {
            if (import.meta.env.DEV) { console.warn('[AIFC_GUARD] blocked detectLanguage before trigger'); }
            return this.currentLang || CONFIG.DEFAULT_LANG;
        }
        
        // Zero-Delta: Skip network call if language already determined by initAnalyzeV2
        const s = (window as unknown as { __aifc_state?: AifcState }).__aifc_state;
        if (s?.formLanguage) {
            if (import.meta.env.DEV) { console.log('[LANG_DETECT] using cached initAnalyzeV2 language:', s.formLanguage); }
            return s.formLanguage;
        }

        try {
            if (import.meta.env.DEV) { console.log('[LANG_DETECT] calling /detect-language endpoint...'); }
            const res = await apiFetch(CONFIG.DETECT_LANGUAGE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ formData })
            });

            const data = await res.json();
            if (import.meta.env.DEV) {
                console.log('[LANG_DETECT] raw response:', JSON.stringify(data));
            }
            const code = data.reply?.trim().toLowerCase() ?? CONFIG.DEFAULT_LANG;

            const VALID = CONFIG.SUPPORTED_LANGS as string[];
            const finalLang = VALID.includes(code) ? code : CONFIG.DEFAULT_LANG;

            if (import.meta.env.DEV) { console.log('[LANG_DETECT] result:', code, '→ finalLang:', finalLang, '| navigator.language:', navigator.language, '| document.lang:', document.documentElement.lang); }
            return finalLang as Lang;
        } catch (_error) {
            if (import.meta.env.DEV) { console.error('[LANG_DETECT] error:', _error, '→ fallback to', CONFIG.DEFAULT_LANG); }
            return CONFIG.DEFAULT_LANG as Lang;
        }
    }
}