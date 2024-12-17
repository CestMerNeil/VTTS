import React from 'react';
import { useTranslation } from 'react-i18next';
import { Settings as SettingsIcon, Moon, Sun, Globe } from 'lucide-react';

const Settings = () => {
    const { t, i18n } = useTranslation();

    // DaisyUI 所有主题
    const themes = [
        'light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate', 'synthwave',
        'retro', 'cyberpunk', 'valentine', 'halloween', 'garden', 'forest', 'aqua',
        'lofi', 'pastel', 'fantasy', 'wireframe', 'black', 'luxury', 'dracula', 'cmyk',
        'autumn', 'business', 'acid', 'lemonade', 'night', 'coffee', 'winter'
    ];

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('language', lng);
    };

    const changeTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    };

    return (
        <div className="p-6">
            <div className="max-w-2xl mx-auto">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-2xl mb-6">
                            <SettingsIcon className="text-primary" size={28} />
                            {t('settings.title')}
                        </h2>

                        {/* 语言设置 */}
                        <div className="form-control">
                            <div className="divider">{t('settings.language')}</div>
                            <div className="flex gap-4 mt-4">
                                <button
                                    className={`btn ${i18n.language === 'zh' ? 'btn-primary' : 'btn-outline'}`}
                                    onClick={() => changeLanguage('zh')}
                                >
                                    <Globe size={20} />
                                    中文
                                </button>
                                <button
                                    className={`btn ${i18n.language === 'en' ? 'btn-primary' : 'btn-outline'}`}
                                    onClick={() => changeLanguage('en')}
                                >
                                    <Globe size={20} />
                                    English
                                </button>
                            </div>
                        </div>

                        {/* 主题设置 */}
                        <div className="form-control mt-8">
                            <div className="divider">{t('settings.theme')}</div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                                {themes.map((theme) => (
                                    <button
                                        key={theme}
                                        className="btn btn-outline capitalize"
                                        onClick={() => changeTheme(theme)}
                                    >
                                        {theme === 'dark' || theme === 'light' ? (
                                            <>
                                                {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
                                                <span className="ml-2">{theme}</span>
                                            </>
                                        ) : (
                                            theme
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;