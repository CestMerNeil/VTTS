// src/hooks/useLanguage.js
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const useLanguage = () => {
    const { i18n } = useTranslation();

    const detectSystemLanguage = () => {
        const browserLang = navigator.language.split('-')[0];
        const supportedLangs = ['zh', 'en', 'fr', 'ja', 'ko'];
        return supportedLangs.includes(browserLang) ? browserLang : 'en';
    };

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('language', lang);
        // 更新文档的 lang 属性
        document.documentElement.lang = lang;
    };

    useEffect(() => {
        const savedLang = localStorage.getItem('language');
        if (!savedLang) {
            const systemLang = detectSystemLanguage();
            changeLanguage(systemLang);
        }
    }, []);

    return {
        currentLanguage: i18n.language,
        changeLanguage,
        detectSystemLanguage,
        isRTL: ['ar', 'he'].includes(i18n.language), // 为未来可能添加的 RTL 语言做准备
    };
};