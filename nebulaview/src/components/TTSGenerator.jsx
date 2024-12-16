import React, { useState } from 'react';
import { Volume2, Loader2 } from 'lucide-react';

const TTSGenerator = () => {
    const [text, setText] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!text.trim()) {
            setError('请输入要转换的文本');
            return;
        }

        setIsGenerating(true);
        setError('');
        setSuccessMessage('');

        try {
            const response = await fetch('http://localhost:5001/model/tts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: text.trim(),
                    model: 'zh-CN'
                })
            });

            if (!response.ok) {
                throw new Error('生成失败');
            }

            setSuccessMessage('音频生成成功！请到音频列表查看。');
            setText('');
        } catch (error) {
            setError('生成过程中出现错误，请重试');
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

                        <form onSubmit={handleSubmit}>
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

                            {error && (
                                <div className="alert alert-error mt-4">
                                    <span>{error}</span>
                                </div>
                            )}

                            {successMessage && (
                                <div className="alert alert-success mt-4">
                                    <span>{successMessage}</span>
                                </div>
                            )}

                            <div className="card-actions justify-end mt-6">
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
                                    ) : (
                                        '开始生成'
                                    )}
                                </button>
                            </div>
                        </form>

                        <div className="divider mt-8">使用说明</div>
                        <div className="space-y-2 text-sm text-base-content/70">
                            <p>• 输入想要转换的中文文本内容</p>
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