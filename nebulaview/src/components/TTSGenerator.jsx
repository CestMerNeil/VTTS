import React, { useState, useEffect } from 'react';
import { Volume2, Loader2, AlertCircle } from 'lucide-react';

const TTSGenerator = () => {
    const [text, setText] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [models, setModels] = useState({});
    const [selectedModel, setSelectedModel] = useState('');
    const [filename, setFilename] = useState('');

    useEffect(() => {
        fetchModels();
    }, []);

    const fetchModels = async () => {
        try {
            const response = await fetch('http://localhost:5001/model/models');
            const data = await response.json();
            if (data.status === 'success' && data.models) {
                setModels(data.models);
                // 如果有模型，选择第一个作为默认值
                if (Object.keys(data.models).length > 0) {
                    setSelectedModel(Object.keys(data.models)[0]);
                }
            }
        } catch (error) {
            console.error('Failed to fetch models:', error);
            setError('获取模型列表失败');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) {
            setError('请输入要转换的文本');
            return;
        }

        if (!selectedModel) {
            setError('请选择语音模型');
            return;
        }

        setIsGenerating(true);
        setError('');
        setSuccessMessage('');

        try {
            const response = await fetch('http://localhost:5001/model/tts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: text.trim(),
                    model: selectedModel,
                    filename: filename.trim() || undefined
                })
            });

            const data = await response.json();

            if (data.status === 'success') {
                setSuccessMessage('音频生成成功！请到音频列表查看。');
                setText('');
                setFilename('');
            } else {
                throw new Error(data.message || '生成失败');
            }
        } catch (error) {
            setError(error.message || '生成过程中出现错误，请重试');
            console.error('TTS generation error:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="p-6">
            <div className="max-w-2xl mx-auto">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-2xl mb-6">
                            <Volume2 className="text-primary" size={28} />
                            文字转语音
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* 文本输入 */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-lg">输入文本内容</span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered h-32"
                                    placeholder="请输入要转换为语音的文本内容..."
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                />
                            </div>

                            {/* 模型选择 */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">选择语音模型</span>
                                </label>
                                <select
                                    className="select select-bordered w-full"
                                    value={selectedModel}
                                    onChange={(e) => setSelectedModel(e.target.value)}
                                >
                                    {Object.keys(models).length === 0 && (
                                        <option value="">没有可用的模型</option>
                                    )}
                                    {Object.entries(models).map(([code, info]) => (
                                        <option key={code} value={code}>
                                            {code}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* 文件名输入 */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">文件名（可选）</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="请输入文件名"
                                    className="input input-bordered w-full"
                                    value={filename}
                                    onChange={(e) => setFilename(e.target.value)}
                                />
                            </div>

                            {/* 错误提示 */}
                            {error && (
                                <div className="alert alert-error">
                                    <AlertCircle className="h-4 w-4" />
                                    <span>{error}</span>
                                </div>
                            )}

                            {/* 成功提示 */}
                            {successMessage && (
                                <div className="alert alert-success">
                                    <span>{successMessage}</span>
                                </div>
                            )}

                            {/* 提交按钮 */}
                            <div className="card-actions justify-end">
                                <button
                                    type="submit"
                                    className={`btn btn-primary ${isGenerating ? 'btn-disabled' : ''}`}
                                    disabled={isGenerating}
                                >
                                    {isGenerating ? (
                                        <>
                                            <Loader2 className="animate-spin" size={20} />
                                            生成中...
                                        </>
                                    ) : '开始生成'}
                                </button>
                            </div>
                        </form>

                        <div className="divider mt-8">使用说明</div>
                        <div className="space-y-2 text-sm text-base-content/70">
                            <p>• 输入想要转换的中文文本内容</p>
                            <p>• 选择合适的语音模型</p>
                            <p>• 可以指定生成音频的文件名（可选）</p>
                            <p>• 点击"开始生成"按钮进行转换</p>
                            <p>• 生成完成后可在音频列表中查看和播放</p>
                            <p>• 建议输入的文本长度适中，避免过长</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TTSGenerator;