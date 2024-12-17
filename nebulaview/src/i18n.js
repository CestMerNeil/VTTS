// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { zh, en, fr, ja, ko } from './locales/languages';  // 确保路径正确

i18n
    .use(initReactI18next)
    .init({
        resources: {
            zh: { translation: zh },
            en: { translation: en },
            fr: { translation: fr },
            ja: { translation: ja },
            ko: { translation: ko }
        },
        lng: localStorage.getItem('language') || 'zh', // 默认语言
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;