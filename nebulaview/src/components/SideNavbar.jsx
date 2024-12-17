import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Wand2, Music, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SideNavbar = () => {
    const location = useLocation();
    const { t } = useTranslation();

    return (
        <div className="h-screen w-64 bg-base-200 border-r border-base-300 flex flex-col overflow-hidden">
            {/* Profile Section */}
            <div className="flex-none p-4 border-b border-base-300">
                <div className="flex flex-col items-center">
                    <div className="avatar">
                        <div className="w-24 rounded-xl">
                            <img src="/FUFU.jpg" alt="FUFU" className="object-cover" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Menu */}
            <div className="flex-1 overflow-y-auto">
                <ul className="menu p-4 space-y-2">
                    <li>
                        <Link
                            to="/"
                            className={`flex items-center gap-4 text-lg ${location.pathname === '/' ? 'active' : ''}`}
                        >
                            <Home size={20} />
                            {t('nav.home')}
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/generate"
                            className={`flex items-center gap-4 text-lg ${location.pathname === '/generate' ? 'active' : ''}`}
                        >
                            <Wand2 size={20} />
                            {t('nav.generate')}
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/audio"
                            className={`flex items-center gap-4 text-lg ${location.pathname === '/audio' ? 'active' : ''}`}
                        >
                            <Music size={20} />
                            {t('nav.audio')}
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/settings"
                            className={`flex items-center gap-4 text-lg ${location.pathname === '/settings' ? 'active' : ''}`}
                        >
                            <Settings size={20} />
                            {t('nav.settings')}
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SideNavbar;