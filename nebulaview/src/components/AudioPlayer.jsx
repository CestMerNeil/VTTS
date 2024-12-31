import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Repeat, Trash2, AlertCircle } from 'lucide-react';
import { useTranslation } from "react-i18next";

const AudioPlayer = () => {
    const { t } = useTranslation();
    const [audioFiles, setAudioFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [loopMode, setLoopMode] = useState('none');
    const [deleteError, setDeleteError] = useState('');
    const audioRef = useRef(null);

    useEffect(() => {
        fetchAudioFiles();
    }, []);

    const fetchAudioFiles = async () => {
        try {
            const response = await fetch('http://localhost:5001/file/audio');
            const data = await response.json();
            if (data.status === 'success') {
                // 转换文件列表格式
                const processedFiles = data.files.map(filename => ({
                    name: filename,
                    // 注意这里使用了正确的音频文件访问路径
                    path: `http://localhost:5001/model/audio/${filename}`
                }));
                setAudioFiles(processedFiles);
            }
        } catch (error) {
            console.error('Failed to fetch audio files:', error);
            setDeleteError('获取音频文件列表失败');
        }
    };

    const handleDelete = async (file, event) => {
        event.stopPropagation();

        try {
            // 如果正在播放要删除的文件，先停止播放
            if (selectedFile?.name === file.name) {
                if (audioRef.current) {
                    audioRef.current.pause();
                }
                setIsPlaying(false);
                setSelectedFile(null);
            }

            const response = await fetch(`http://localhost:5001/file/audio/${file.name}`, {
                method: 'DELETE'
            });

            const data = await response.json();

            if (data.status === 'success') {
                fetchAudioFiles();
                setDeleteError('');
            } else {
                setDeleteError(data.message || '删除失败');
            }
        } catch (error) {
            console.error('Failed to delete audio file:', error);
            setDeleteError('删除文件时发生错误');
        }
    };

    const handlePlay = async () => {
        if (audioRef.current) {
            try {
                if (isPlaying) {
                    await audioRef.current.pause();
                } else {
                    await audioRef.current.play();
                }
                setIsPlaying(!isPlaying);
            } catch (error) {
                console.error('Playback error:', error);
                setDeleteError('播放音频时出错');
            }
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            setDuration(audioRef.current.duration);
        }
    };

    const handleEnded = () => {
        if (loopMode === 'single' && audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        } else if (loopMode === 'all' && audioFiles.length > 1) {
            const currentIndex = audioFiles.findIndex(file => file.name === selectedFile.name);
            const nextIndex = (currentIndex + 1) % audioFiles.length;
            handleSelectFile(audioFiles[nextIndex]);
        } else {
            setIsPlaying(false);
        }
    };

    const handleSelectFile = async (file) => {
        setSelectedFile(file);
        setIsPlaying(false);

        // 确保在切换文件时重置时间
        setCurrentTime(0);
        setDuration(0);

        // 使用 setTimeout 确保 audio 元素已更新
        setTimeout(async () => {
            if (audioRef.current) {
                try {
                    await audioRef.current.play();
                    setIsPlaying(true);
                } catch (error) {
                    console.error('Error playing audio:', error);
                    setDeleteError('播放音频时出错');
                }
            }
        }, 100);
    };

    const handleLoopClick = () => {
        const modes = ['none', 'single', 'all'];
        const currentIndex = modes.indexOf(loopMode);
        const nextIndex = (currentIndex + 1) % modes.length;
        setLoopMode(modes[nextIndex]);
    };

    const getLoopButtonStyle = () => {
        switch (loopMode) {
            case 'single':
                return 'btn-primary';
            case 'all':
                return 'btn-secondary';
            default:
                return 'btn-ghost';
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="p-6">
            {deleteError && (
                <div className="alert alert-error mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <span>{deleteError}</span>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 音频列表 */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title mb-4">{t('audio.title')}</h2>
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                            {audioFiles.length === 0 ? (
                                <div className="text-center text-base-content/50 py-4">
                                    还没有生成的音频
                                </div>
                            ) : (
                                audioFiles.map((file, index) => (
                                    <div
                                        key={index}
                                        className={`p-4 rounded-xl cursor-pointer hover:bg-base-200 transition-colors flex justify-between items-center
                                        ${selectedFile?.name === file.name ? 'bg-primary/10' : ''}`}
                                        onClick={() => handleSelectFile(file)}
                                    >
                                        <p className="text-sm font-medium">{file.name}</p>
                                        <button
                                            className="btn btn-ghost btn-sm text-error hover:bg-error/20"
                                            onClick={(e) => handleDelete(file, e)}
                                            title={t('audio.controls.delete')}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* 播放器 */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title mb-4">{t('audio.player')}</h2>

                        {selectedFile ? (
                            <>
                                <div className="text-center mb-4">
                                    <p className="text-lg font-medium">{selectedFile.name}</p>
                                    <p className="text-sm text-base-content/60">
                                        {t('audio.loopMode.title')}: {t(`audio.loopMode.${loopMode}`)}
                                    </p>
                                </div>

                                <audio
                                    ref={audioRef}
                                    src={selectedFile.path}
                                    onTimeUpdate={handleTimeUpdate}
                                    onEnded={handleEnded}
                                    onError={() => setDeleteError('音频文件加载失败')}
                                />

                                {/* 进度条 */}
                                <div className="w-full">
                                    <input
                                        type="range"
                                        min={0}
                                        max={duration || 100}
                                        value={currentTime}
                                        onChange={(e) => {
                                            const time = Number(e.target.value);
                                            setCurrentTime(time);
                                            if (audioRef.current) {
                                                audioRef.current.currentTime = time;
                                            }
                                        }}
                                        className="range range-primary range-sm"
                                    />
                                    <div className="flex justify-between text-sm mt-1">
                                        <span>{formatTime(currentTime)}</span>
                                        <span>{formatTime(duration)}</span>
                                    </div>
                                </div>

                                {/* 控制按钮 */}
                                <div className="flex justify-center items-center gap-4 mt-4">
                                    <button
                                        className="btn btn-circle btn-primary"
                                        onClick={() => {
                                            if (audioFiles.length > 1) {
                                                const currentIndex = audioFiles.findIndex(file => file.name === selectedFile.name);
                                                const prevIndex = (currentIndex - 1 + audioFiles.length) % audioFiles.length;
                                                handleSelectFile(audioFiles[prevIndex]);
                                            }
                                        }}
                                        disabled={audioFiles.length <= 1}
                                        title={t('audio.controls.previous')}
                                    >
                                        <SkipBack size={20} />
                                    </button>
                                    <button
                                        className="btn btn-circle btn-primary btn-lg"
                                        onClick={handlePlay}
                                        title={t(`audio.controls.${isPlaying ? 'pause' : 'play'}`)}
                                    >
                                        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                                    </button>
                                    <button
                                        className="btn btn-circle btn-primary"
                                        onClick={() => {
                                            if (audioFiles.length > 1) {
                                                const currentIndex = audioFiles.findIndex(file => file.name === selectedFile.name);
                                                const nextIndex = (currentIndex + 1) % audioFiles.length;
                                                handleSelectFile(audioFiles[nextIndex]);
                                            }
                                        }}
                                        disabled={audioFiles.length <= 1}
                                        title={t('audio.controls.next')}
                                    >
                                        <SkipForward size={20} />
                                    </button>
                                    <button
                                        className={`btn btn-circle ${getLoopButtonStyle()}`}
                                        onClick={handleLoopClick}
                                        title={t(`audio.loopMode.${loopMode}`)}
                                    >
                                        <Repeat size={20} />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="text-center text-base-content/50 py-12">
                                {t('audio.selectAudio')}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AudioPlayer;