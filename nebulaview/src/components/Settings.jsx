import React, { useState } from 'react';

const Settings = () => {
    const [settings, setSettings] = useState({
        notifications: true,
        darkMode: false,
        language: 'zh',
        autoSave: true,
        fontSize: 'medium'
    });

    const handleToggle = (key) => {
        setSettings(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleSelect = (key, value) => {
        setSettings(prev => ({
            ...prev,
            [key]: value
        }));
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-2xl font-bold mb-6">设置</h2>

                    {/* 常规设置 */}
                    <div className="space-y-6">
                        <div className="divider">常规设置</div>

                        {/* 语言选择 */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">语言</span>
                            </label>
                            <select
                                className="select select-bordered w-full max-w-xs"
                                value={settings.language}
                                onChange={(e) => handleSelect('language', e.target.value)}
                            >
                                <option value="zh">中文</option>
                                <option value="en">English</option>
                                <option value="ja">日本語</option>
                            </select>
                        </div>

                        {/* 字体大小 */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg">字体大小</span>
                            </label>
                            <select
                                className="select select-bordered w-full max-w-xs"
                                value={settings.fontSize}
                                onChange={(e) => handleSelect('fontSize', e.target.value)}
                            >
                                <option value="small">小</option>
                                <option value="medium">中</option>
                                <option value="large">大</option>
                            </select>
                        </div>

                        {/* 深色模式开关 */}
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text text-lg">深色模式</span>
                                <input
                                    type="checkbox"
                                    className="toggle toggle-primary"
                                    checked={settings.darkMode}
                                    onChange={() => handleToggle('darkMode')}
                                />
                            </label>
                        </div>
                    </div>

                    {/* 通知设置 */}
                    <div className="space-y-6 mt-8">
                        <div className="divider">通知设置</div>

                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text text-lg">启用通知</span>
                                <input
                                    type="checkbox"
                                    className="toggle toggle-primary"
                                    checked={settings.notifications}
                                    onChange={() => handleToggle('notifications')}
                                />
                            </label>
                        </div>
                    </div>

                    {/* 其他设置 */}
                    <div className="space-y-6 mt-8">
                        <div className="divider">其他设置</div>

                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text text-lg">自动保存</span>
                                <input
                                    type="checkbox"
                                    className="toggle toggle-primary"
                                    checked={settings.autoSave}
                                    onChange={() => handleToggle('autoSave')}
                                />
                            </label>
                        </div>
                    </div>

                    {/* 保存按钮 */}
                    <div className="mt-8">
                        <button className="btn btn-primary">保存设置</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;