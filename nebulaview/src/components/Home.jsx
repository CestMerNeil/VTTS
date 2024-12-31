import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Upload, Trash2, AlertCircle } from 'lucide-react';

function Home() {
    const { t } = useTranslation();
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [models, setModels] = useState({});
    const [uploadFiles, setUploadFiles] = useState({
        config: null,
        model: null,
        scale_stats: null
    });
    const [languageCode, setLanguageCode] = useState('');
    const [uploadError, setUploadError] = useState('');

    // 获取可用模型列表
    const fetchModels = async () => {
        try {
            const response = await fetch('http://localhost:5001/model/models');
            const data = await response.json();
            if (data.status === 'success') {
                setModels(data.models);
            }
        } catch (error) {
            console.error('Failed to fetch models:', error);
        }
    };

    useEffect(() => {
        fetchModels();
    }, []);

    // 处理文件选择
    const handleFileChange = (type) => (event) => {
        const file = event.target.files[0];
        setUploadFiles(prev => ({
            ...prev,
            [type]: file
        }));
        setUploadError('');
    };

    // 处理模型上传
    const handleUploadModel = async () => {
        if (!languageCode) {
            setUploadError('请输入语言代码');
            return;
        }

        if (!uploadFiles.config || !uploadFiles.model || !uploadFiles.scale_stats) {
            setUploadError('请选择所有必需的文件');
            return;
        }

        const formData = new FormData();
        formData.append('config', uploadFiles.config);
        formData.append('model', uploadFiles.model);
        formData.append('scale_stats', uploadFiles.scale_stats);

        try {
            const response = await fetch(`http://localhost:5001/file/model/${languageCode}`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (data.status === 'success') {
                setUploadError('');
                setUploadFiles({
                    config: null,
                    model: null,
                    scale_stats: null
                });
                setLanguageCode('');
                fetchModels();
            } else {
                setUploadError(data.message);
            }
        } catch (error) {
            console.error('Failed to upload model:', error);
            setUploadError('上传失败，请重试');
        }
    };

    // 处理模型删除
    const handleDeleteModel = async (languageCode) => {
        try {
            const response = await fetch(`http://localhost:5001/file/model/${languageCode}`, {
                method: 'DELETE'
            });

            const data = await response.json();
            if (data.status === 'success') {
                fetchModels();
            } else {
                setUploadError(data.message);
            }
        } catch (error) {
            console.error('Failed to delete model:', error);
            setUploadError('删除失败，请重试');
        }
    };

    // 测试功能
    const handleGreet = async () => {
        if (!name.trim()) {
            setMessage("Please enter your name");
            return;
        }
        setIsLoading(true);
        try {
            const response = await fetch("http://localhost:5001/health", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name }),
            });
            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            console.error("Failed to connect to Flask:", error);
            setMessage("Error: Unable to connect to the backend.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4">
            <div className="container mx-auto max-w-4xl">
                {/* 上传模型卡片 */}
                <div className="card bg-base-100 shadow-xl mb-6">
                    <div className="card-body">
                        <h2 className="card-title text-xl mb-4">上传模型</h2>

                        {uploadError && (
                            <div className="alert alert-error mb-4">
                                <AlertCircle className="h-4 w-4" />
                                <span>{uploadError}</span>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">语言代码</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="例如: zh-CN"
                                    className="input input-bordered w-full"
                                    value={languageCode}
                                    onChange={(e) => setLanguageCode(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">配置文件 (config.json)</span>
                                </label>
                                <input
                                    type="file"
                                    className="file-input file-input-bordered w-full"
                                    accept=".json"
                                    onChange={handleFileChange('config')}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">模型文件 (model_file.pth)</span>
                                </label>
                                <input
                                    type="file"
                                    className="file-input file-input-bordered w-full"
                                    accept=".pth"
                                    onChange={handleFileChange('model')}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">统计文件 (scale_stats.npy)</span>
                                </label>
                                <input
                                    type="file"
                                    className="file-input file-input-bordered w-full"
                                    accept=".npy"
                                    onChange={handleFileChange('scale_stats')}
                                />
                            </div>
                        </div>

                        <div className="card-actions justify-end">
                            <button
                                className="btn btn-primary"
                                onClick={handleUploadModel}
                            >
                                <Upload className="h-4 w-4 mr-2" />
                                上传模型
                            </button>
                        </div>
                    </div>
                </div>

                {/* 模型列表卡片 */}
                <div className="card bg-base-100 shadow-xl mb-6">
                    <div className="card-body">
                        <h2 className="card-title text-xl mb-4">模型列表</h2>
                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full">
                                <thead>
                                    <tr>
                                        <th>语言代码</th>
                                        <th>配置文件</th>
                                        <th>模型文件</th>
                                        <th>统计文件</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(models).map(([code, info]) => (
                                        <tr key={code}>
                                            <td>{code}</td>
                                            <td>{info.config_path.split('/').pop()}</td>
                                            <td>{info.model_file.split('/').pop()}</td>
                                            <td>{info.scale_stats.split('/').pop()}</td>
                                            <td>
                                                <button
                                                    className="btn btn-error btn-sm"
                                                    onClick={() => handleDeleteModel(code)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* 测试功能卡片 */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-xl mb-4">连接测试</h2>
                        <div className="form-control gap-4">
                            <div className="join w-full">
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="input input-bordered join-item flex-1"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <button
                                    className={`btn btn-primary join-item ${isLoading ? 'loading' : ''}`}
                                    onClick={handleGreet}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Loading...' : 'Greet'}
                                </button>
                            </div>
                            {message && (
                                <div className={`alert ${message.startsWith('Error') ? 'alert-error' : 'alert-success'} shadow-lg`}>
                                    <span>{message}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;