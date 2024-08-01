import React, { useState, useEffect, useRef } from "react";
import { Card, Box, Divider, Button, Typography } from "@mui/material";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const getFileNameWithoutExtension = (fileName) => {
    return fileName.replace(/\.[^/.]+$/, "");
};

const FileList = ({ setAudio }) => {
    const [files, setFiles] = useState([]);
    const playingRef = useRef({});
    const audioRef = useRef({});

    useEffect(() => {
        const fetchWavFiles = async () => {
            try {
                const files = await window.electron.getWavFiles();
                setFiles(files);
            } catch (err) {
                console.error("获取音频文件列表时出错：", err);
                // 可以在这里添加用户友好的错误消息显示
            }
        };
        fetchWavFiles();
    }, []);

    const handlePlay = (file) => {
        window.electron.getAudioPath(file).then((audioPath) => {
            setAudio(audioPath);
            if (!audioRef.current[file]) {
                audioRef.current[file] = new Audio(audioPath);
                audioRef.current[file].addEventListener('ended', () => {
                    playingRef.current[file] = false;
                    setFiles([...files]); // 触发重新渲染
                });
            }

            if (!playingRef.current[file]) {
                audioRef.current[file].play().then(() => {
                    playingRef.current[file] = true;
                    setFiles([...files]); // 触发重新渲染
                }).catch((err) => {
                    console.log("Play error: ", err);
                });
            } else {
                audioRef.current[file].pause();
                playingRef.current[file] = false;
                setFiles([...files]); // 触发重新渲染
            }
        });
    };

    return (
        <Box sx={{ margin: '3%', overflow: 'auto' }}>
            <Divider />
            {files.map((file, index) => (
                <Card key={index} sx={{ margin: '5%', display: 'flex', alignItems: 'center' }}>
                    <Button
                        variant="contained"
                        startIcon={<PlayCircleIcon />}
                        onClick={() => handlePlay(file)}
                        sx={{ margin: '10px' }}
                    >
                        {playingRef.current[file] ? '暂停' : '播放'}
                    </Button>
                    <h3>{getFileNameWithoutExtension(file)}</h3>
                </Card>
            ))}
        </Box>
    );
};


const AudioPlayer = ({ audio }) => {
    const [progress, setProgress] = useState(0);
    const audioRef = useRef(new Audio());

    // 加载音频文件并准备播放
    useEffect(() => {
        if (audio) {
            audioRef.current.src = audio; // 假设 `audio` 是音频文件的路径
            audioRef.current.load();
        }
    }, [audio]);

    // 当音频播放时，更新进度条
    useEffect(() => {
        const updateProgress = () => {
            const current = audioRef.current.currentTime;
            const duration = audioRef.current.duration;
            setProgress((current / duration) * 100);
        };

        audioRef.current.addEventListener('timeupdate', updateProgress);
        return () => {
            audioRef.current.removeEventListener('timeupdate', updateProgress);
        };
    }, []);

    // 处理用户移动进度条
    const handleProgressChange = (event) => {
        const value = event.target.value;
        audioRef.current.currentTime = (audioRef.current.duration / 100) * value;
        setProgress(value);
    };

    return (
        <Card sx={{ margin: '25px', borderRadius: '25px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h1>播放器</h1>
            <Typography>
                {getFileNameWithoutExtension(audio)}
            </Typography>
            <input
                type="range"
                value={progress}
                onChange={handleProgressChange}
                min="0"
                max="100"
                step="1"
            />
        </Card>
    );
};


export default function Player() {
    const [audio, setAudio] = useState("");

    return (
        <div>
            <h1>合成列表</h1>
            <FileList setAudio={setAudio} />
        </div>
    );
};
