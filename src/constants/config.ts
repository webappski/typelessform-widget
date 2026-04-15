// Для продакшена используйте npm run build:prod
// Он автоматически подставит правильные URL через env переменные

const transcribeUrl = import.meta.env.VITE_TRANSCRIBE_URL ||
  'http://127.0.0.1:5003/ai-form-copilot-eu/europe-central2/transcribe';

const completeUrl = import.meta.env.VITE_COMPLETE_URL ||
  'http://127.0.0.1:5003/ai-form-copilot-eu/europe-central2/complete';

const detectLanguageUrl = import.meta.env.VITE_DETECT_LANGUAGE_URL ||
  'http://127.0.0.1:5003/ai-form-copilot-eu/europe-central2/detectLanguage';

const translateTextUrl = import.meta.env.VITE_TRANSLATE_TEXT_URL ||
  'http://127.0.0.1:5003/ai-form-copilot-eu/europe-central2/translateText';

const initAnalyzeV2Url = import.meta.env.VITE_INIT_ANALYZE_V2_URL ||
  'http://127.0.0.1:5003/ai-form-copilot-eu/europe-central2/initAnalyzeV2';


export const CONFIG = {
    DEFAULT_LANG: 'en',
    SUPPORTED_LANGS: ['en', 'de', 'fr', 'es', 'ru', 'pl', 'it', 'pt', 'zh', 'ja', 'ko', 'ar', 'hi', 'nl', 'sv', 'da', 'no', 'fi', 'tr', 'cs', 'el', 'he', 'th', 'id', 'ro'],
    TRANSCRIBE_FUNCTION_URL: transcribeUrl,
    COMPLETE_FUNCTION_URL: completeUrl,
    DETECT_LANGUAGE_URL: detectLanguageUrl,
    TRANSLATE_TEXT_URL: translateTextUrl,
    INIT_ANALYZE_V2_URL: initAnalyzeV2Url,

    AUDIO: {
        CHROME_SETTINGS: {
            echoCancellation: false,
            noiseSuppression: false,
            autoGainControl: false,
            sampleRate: 48000,
            sampleSize: 24,
            channelCount: 1,
            audioBitsPerSecond: 320000,
            timeslice: 1000
        },
        SAFARI_SETTINGS: {
            echoCancellation: false,
            noiseSuppression: false,
            autoGainControl: false,
            sampleRate: 48000,
            sampleSize: 24,
            channelCount: 1,
            deviceId: 'default',
            timeslice: 500
        },
        IOS_WORKLET_SETTINGS: {
            sampleRate: 48000,
            processorBufferSize: 4096,
            normalizeAudio: true,
            targetFormat: 'wav'
        },
        MIN_BLOB_SIZE: 10000,
        MAX_RECORDING_TIME: 180000, // 3 minutes maximum recording time
        CHECK_CONFIDENCE: true,
        MIN_CONFIDENCE: 0.2
    },
    
    FIELD_CONFIDENCE: {
        // Порог уверенности для полей, требующих проверки (желтый аккордеон)
        NEEDS_CHECK_THRESHOLD: 0.7,
        // Минимальный порог для отображения поля как заполненного
        MIN_FILLED_THRESHOLD: 0.3
    },
    
    EMAIL_PREPROCESSING: {
        // Enable new GPT-based email preprocessing (vs simple pattern matching)
        USE_NEW_VERSION: true,  // Set to false to use legacy email detection
        ENABLE_LANGUAGE_DETECTION: true,  // Language-specific email symbol conversion
        ENABLE_CLEANUP: true  // Post-processing to remove duplicates
    }
};