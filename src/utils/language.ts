import type {FieldDescriptor} from '../form-scanner/index.js';

export class LanguageUtils {
    static detectLanguageFromText(text: string): string | undefined {
        if (!text) {return undefined;}
        
        const lowerText = text.toLowerCase();
        
        // Проверяем специфичные символы
        if (/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/.test(text)) {return 'pl';}
        if (/[а-яА-ЯёЁ]/.test(text)) {return 'ru';}
        if (/[äöüßÄÖÜẞ]/.test(text)) {return 'de';}
        
        // Проверяем немецкие ключевые слова
        const germanWords = [
            'vorname', 'nachname', 'name', 'adresse', 'straße', 'stadt', 'plz', 'postleitzahl',
            'telefon', 'email', 'e-mail', 'geburtsdatum', 'anrede', 'herr', 'frau',
            'firma', 'unternehmen', 'land', 'bundesland', 'österreich', 'schweiz',
            'bitte', 'eingeben', 'auswählen', 'pflichtfeld', 'optional', 'ja', 'nein',
            'weiter', 'zurück', 'senden', 'absenden', 'bestätigen'
        ];
        
        // Проверяем английские ключевые слова
        const englishWords = [
            'first', 'last', 'name', 'address', 'street', 'city', 'zip', 'postal',
            'phone', 'email', 'birth', 'date', 'title', 'company', 'country', 'state',
            'please', 'enter', 'select', 'required', 'optional', 'yes', 'no',
            'next', 'back', 'send', 'submit', 'confirm', 'continue'
        ];
        
        // Подсчитываем совпадения для каждого языка
        const germanMatches = germanWords.filter(word => lowerText.includes(word)).length;
        const englishMatches = englishWords.filter(word => lowerText.includes(word)).length;
        
        if (germanMatches > englishMatches && germanMatches > 0) {return 'de';}
        if (englishMatches > germanMatches && englishMatches > 0) {return 'en';}
        
        // Fallback: если определить не удалось, возвращаем undefined
        // Вызывающий код должен решить что делать с неопределенным языком
        return undefined;
    }

    static isTranslationKey(text: string | null | undefined): boolean {
        if (!text) {return false;}
        const trimmed = text.trim();
        if (/\{\{.*\}\}|\|\s*translate/.test(trimmed)) {return true;}
        if (/^([a-zA-Z0-9]+[._-])+[a-zA-Z0-9]+$/.test(trimmed) && (trimmed.includes('.') || trimmed.includes('_') || trimmed.includes('-'))) {return true;}
        if (/^[a-z0-9-]+-[a-z0-9-]+/.test(trimmed) && trimmed.length > 20) {return true;}
        return false;
    }

    static detectFormLanguage(fields: FieldDescriptor[]): string | undefined {
        const langStats: Record<string, number> = {};
        let totalDetections = 0;

        for (const field of fields) {
            // Объединяем весь текст поля для более точного анализа
            const allText = [field.label, field.placeholder, field.name].filter(Boolean).join(' ');
            
            if (allText && !this.isTranslationKey(allText)) {
                const lang = this.detectLanguageFromText(allText);
                if (lang) {
                    langStats[lang] = (langStats[lang] || 0) + 1;
                    totalDetections++;
                }
            }
        }

        if (totalDetections === 0) {
            return undefined;
        }

        // Находим язык с наибольшим количеством совпадений
        const sortedLangs = Object.entries(langStats)
            .sort(([,a], [,b]) => b - a);

        if (sortedLangs.length > 0) {
            const [topLang, topCount] = sortedLangs[0];
            const confidence = topCount / totalDetections;
            
            
            // Убираем хардкод английского - просто выбираем наиболее частый язык
            // Минимальная уверенность 30% для надежности
            if (confidence >= 0.3) {
                return topLang;
            }
        }

        return undefined;
    }
}
