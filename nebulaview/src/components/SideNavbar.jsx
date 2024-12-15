import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Wand2, Music, Settings } from 'lucide-react';

const SideNavbar = () => {
    const location = useLocation();

    return (
        <div className="h-screen w-64 bg-base-200 border-r border-base-300 flex flex-col overflow-hidden">
            {/* Profile Section - 固定在顶部 */}
            <div className="flex-none p-4 border-b border-base-300">
                <div className="flex flex-col items-center">
                    <div className="avatar">
                        <div className="w-24 rounded-xl">
                            <img src="/FUFU.jpg" alt="FUFU" className="object-cover" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Menu - 可滚动区域 */}
            <div className="flex-1 overflow-y-auto">
                <ul className="menu p-4 space-y-2">
                    <li>
                        <Link
                            to="/"
                            className={`flex items-center gap-4 text-lg ${location.pathname === '/' ? 'active' : ''}`}
                        >
                            <Home size={20} />
                            首页
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/generate"
                            className={`flex items-center gap-4 text-lg ${location.pathname === '/generate' ? 'active' : ''}`}
                        >
                            <Wand2 size={20} />
                            生成
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/audio"
                            className={`flex items-center gap-4 text-lg ${location.pathname === '/audio' ? 'active' : ''}`}
                        >
                            <Music size={20} />
                            音频
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/settings"
                            className={`flex items-center gap-4 text-lg ${location.pathname === '/settings' ? 'active' : ''}`}
                        >
                            <Settings size={20} />
                            设置
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SideNavbar;