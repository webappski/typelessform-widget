// Translation loader with dynamic imports for code splitting
// Each language is loaded on-demand to reduce initial bundle size

export const SUPPORTED_LANGUAGES = [
  'en', 'ru', 'es', 'fr', 'de', 'pl', 'it', 'pt', 'zh', 'ja',
  'nl', 'sv', 'da', 'no', 'fi', 'el', 'cs', 'hu', 'ro', 'bg',
  'sk', 'hr', 'sr', 'uk', 'ko'
] as const;

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

// Translation cache to avoid re-loading
const translationCache = new Map<string, Record<string, string>>();

/**
 * Dynamically load translations for a given language
 * Uses Vite's dynamic import for automatic code splitting
 */
/** Import a translation module by language code */
async function importTranslationModule(lang: string): Promise<{ translations: Record<string, string> }> {
  // Each case is needed for Vite's static analysis of dynamic imports
  const importMap: Record<string, () => Promise<{ translations: Record<string, string> }>> = {
    'en': () => import('./en.js'), 'ru': () => import('./ru.js'),
    'es': () => import('./es.js'), 'fr': () => import('./fr.js'),
    'de': () => import('./de.js'), 'pl': () => import('./pl.js'),
    'it': () => import('./it.js'), 'pt': () => import('./pt.js'),
    'zh': () => import('./zh.js'), 'ja': () => import('./ja.js'),
    'nl': () => import('./nl.js'), 'sv': () => import('./sv.js'),
    'da': () => import('./da.js'), 'no': () => import('./no.js'),
    'fi': () => import('./fi.js'), 'el': () => import('./el.js'),
    'cs': () => import('./cs.js'), 'hu': () => import('./hu.js'),
    'ro': () => import('./ro.js'), 'bg': () => import('./bg.js'),
    'sk': () => import('./sk.js'), 'hr': () => import('./hr.js'),
    'sr': () => import('./sr.js'), 'uk': () => import('./uk.js'),
    'ko': () => import('./ko.js'),
  };
  const loader = importMap[lang] || importMap['en'];
  return loader();
}

export async function loadTranslations(lang: string): Promise<Record<string, string>> {
  if (translationCache.has(lang)) {
    return translationCache.get(lang)!;
  }

  const normalizedLang = SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage) ? lang : 'en';

  try {
    const module = await importTranslationModule(normalizedLang);
    const translations = module.translations;
    translationCache.set(normalizedLang, translations);
    return translations;
  } catch (error) {
    console.error(`Failed to load translations for ${normalizedLang}:`, error);
    if (normalizedLang !== 'en') {
      return loadTranslations('en');
    }
    return {};
  }
}

/**
 * Preload translations for a language in the background
 * Useful for preloading the user's detected language
 */
export function preloadTranslations(lang: string): void {
  if (!translationCache.has(lang)) {
    loadTranslations(lang).catch(err => {
      console.warn(`Failed to preload translations for ${lang}:`, err);
    });
  }
}

/**
 * Clear translation cache (useful for testing or memory management)
 */
export function clearTranslationCache(): void {
  translationCache.clear();
}
