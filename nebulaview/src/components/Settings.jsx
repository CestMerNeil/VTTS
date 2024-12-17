import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Settings as SettingsIcon, Globe, Palette, Check } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

// 语言选择组件
const LanguageSelector = ({ currentLanguage, onLanguageChange }) => {
    const { t } = useTranslation();

    const languages = [
        { code: 'zh', name: '中文', flag: '🇨🇳', description: '简体中文' },
        { code: 'en', name: 'English', flag: '🇺🇸', description: 'United States' },
        { code: 'fr', name: 'Français', flag: '🇫🇷', description: 'France' },
        { code: 'ja', name: '日本語', flag: '🇯🇵', description: '日本' },
        { code: 'ko', name: '한국어', flag: '🇰🇷', description: '대한민국' }
    ];

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <div className="flex items-center gap-3 mb-6">
                    <Globe className="text-primary" size={24} />
                    <h2 className="card-title text-2xl">{t('settings.language.title')}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {languages.map((lang) => (
                        <div
                            key={lang.code}
                            onClick={() => onLanguageChange(lang.code)}
                            className={`card bg-base-200 cursor-pointer hover:bg-base-300 transition-all
                ${currentLanguage === lang.code ? 'ring-2 ring-primary ring-offset-2 ring-offset-base-100' : ''}`}
                        >
                            <div className="card-body p-4 flex flex-row items-center">
                                <div className="text-2xl mr-3">{lang.flag}</div>
                                <div className="flex-1">
                                    <h3 className="font-bold">{lang.name}</h3>
                                    <p className="text-sm opacity-70">{lang.description}</p>
                                </div>
                                {currentLanguage === lang.code && (
                                    <Check className="text-primary" size={20} />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// 主题选择组件
const ThemeSelector = () => {
    const { t } = useTranslation();
    const currentTheme = localStorage.getItem('theme') || 'light';

    const themes = [
        {
            category: t('settings.theme.colorful'),
            items: ["cupcake", "valentine", "garden", "autumn", "pastel", "fantasy"]
        },
        {
            category: t('settings.theme.classic'),
            items: ["light", "dark", "emerald", "corporate", "business", "winter"]
        },
        {
            category: t('settings.theme.dark'),
            items: ["synthwave", "cyberpunk", "halloween", "forest", "luxury", "dracula", "night", "coffee"]
        },
        {
            category: t('settings.theme.special'),
            items: ["retro", "aqua", "lofi", "wireframe", "black", "cmyk", "acid", "lemonade"]
        }
    ];

    const changeTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    };

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <div className="flex items-center gap-3 mb-6">
                    <Palette className="text-primary" size={24} />
                    <h2 className="card-title text-2xl">{t('settings.theme.title')}</h2>
                </div>

                {themes.map((category) => (
                    <div key={category.category} className="mb-8 last:mb-0">
                        <h3 className="text-lg font-semibold mb-4">{category.category}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {category.items.map((theme) => (
                                <div
                                    key={theme}
                                    onClick={() => changeTheme(theme)}
                                    className="cursor-pointer group"
                                >
                                    <div
                                        data-theme={theme}
                                        className={`w-full h-32 rounded-xl border overflow-hidden transition-all duration-300
                      ${currentTheme === theme ? 'ring-2 ring-primary ring-offset-2' : 'border-base-300'}
                      group-hover:border-primary group-hover:shadow-lg`}
                                    >
                                        <div className="w-full h-full bg-base-100 p-3">
                                            <div className="flex gap-2 mb-2">
                                                <div className="w-2 h-2 rounded-full bg-primary"></div>
                                                <div className="w-2 h-2 rounded-full bg-secondary"></div>
                                                <div className="w-2 h-2 rounded-full bg-accent"></div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="h-2 w-8 bg-primary rounded"></div>
                                                <div className="h-2 w-12 bg-secondary rounded"></div>
                                                <div className="h-2 w-10 bg-accent rounded"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-2 text-center">
                                        <span className="text-sm">{t(`settings.theme.names.${theme}`)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// 主设置页面
const Settings = () => {
    const { t } = useTranslation();
    const { currentLanguage, changeLanguage } = useLanguage();

    // 初始化主题
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    return (
        <div className="p-6 max-w-[1200px] mx-auto">
            <div className="flex items-center gap-3 mb-8">
                <SettingsIcon size={32} className="text-primary" />
                <h1 className="text-3xl font-bold">{t('settings.title')}</h1>
            </div>

            <div className="grid grid-cols-1 gap-8">
                <LanguageSelector
                    currentLanguage={currentLanguage}
                    onLanguageChange={changeLanguage}
                />
                <ThemeSelector />
            </div>
        </div>
    );
};

export default Settings;