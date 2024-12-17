import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Repeat } from 'lucide-react';
import { useTranslation } from "react-i18next";

const AudioPlayer = () => {
    const { t } = useTranslation();
    const [audioFiles, setAudioFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [loopMode, setLoopMode] = useState('none');
    const audioRef = useRef(null);

    useEffect(() => {
        fetchAudioFiles();
    }, []);

    const fetchAudioFiles = async () => {
        try {
            const response = await fetch('http://localhost:5001/model/audios');
            const data = await response.json();
            if (data.status === 'success') {
                const processedFiles = data.audios.map(path => ({
                    path: path,
                    name: path.split('/').pop()
                }));
                setAudioFiles(processedFiles);
            }
        } catch (error) {
            console.error('Failed to fetch audio files:', error);
        }
    };

    const handlePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            setDuration(audioRef.current.duration);
        }
    };

    const handleEnded = () => {
        if (loopMode === 'single') {
            audioRef.current.play();
        } else if (loopMode === 'all') {
            const currentIndex = audioFiles.findIndex(file => file.path === selectedFile.path);
            const nextIndex = (currentIndex + 1) % audioFiles.length;
            handleSelectFile(audioFiles[nextIndex]);
        } else {
            setIsPlaying(false);
        }
    };

    const handleSelectFile = (file) => {
        setSelectedFile(file);
        setIsPlaying(false);
        setTimeout(() => {
            if (audioRef.current) {
                audioRef.current.play();
                setIsPlaying(true);
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 音频列表 */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title mb-4">{t('audio.title')}</h2>
                        <div className="space-y-2 max-h-[400px] overflow-y-auto">
                            {audioFiles.map((file, index) => (
                                <div
                                    key={index}
                                    className={`p-4 rounded-xl cursor-pointer hover:bg-base-200 transition-colors
                    ${selectedFile?.path === file.path ? 'bg-primary/10' : ''}`}
                                    onClick={() => handleSelectFile(file)}
                                >
                                    <p className="text-sm font-medium">{file.name}</p>
                                </div>
                            ))}
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
                                            audioRef.current.currentTime = time;
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