import React, { useEffect, useState } from "react";
import { TextField, FormControl, Divider, Box, Button } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import Swal from 'sweetalert2';


export default function TTS() {
    const [text, setText] = useState("");
    const [models, setModels] = useState([]);
    const [modelPath, setModel] = useState("");
    const [modelConfig, setConfig] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        fetch("/Model_List.json")
            .then((response) => response.json())
            .then((data) => { setModels(data) })
            .catch((error) => { console.log(error) });        

        window.electron.receive('synthesize-tts-reply', handleSynthesizeReply);

        return () => {
            window.electron.receive('synthesize-tts-reply', () => {});
        }
    }, []);


    const handleSynthesizeReply = (event, arg) => {
        console.log("已完成合成");
        console.log(event);
        console.log(arg);
        if (arg) {
            Swal.fire({
                icon: 'success',
                title: '合成成功',
                text: '请点击播放按钮进行播放'
            });
        }
    }

    const handleChange = (event) => {
        setText(event.target.value);
    }

    const handleChoose = (event) => {
        //setModel(event.target.value);
        for (let i = 0; i < models.length; i++) {
            if (models[i].model_name === event.target.value) {
                setModel(models[i].model_path);
                setConfig(models[i].model_config);
                break;
            }
        }
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleSynthesize = () => {
        if (text === "" || modelPath === "" || modelConfig === "") {
            Swal.fire({
                icon: 'error',
                title: '大事不妙(｡ì _ í｡)',
                text: '请完善信息后再进行合成'
            });
            return;
        }
        else {
            window.electron.send('synthesize-tts', { text, modelPath, modelConfig, title });
        }
    }

    return (
        <Box sx={{ margin: '3%', overflow: 'auto' }}>
            <h1>语音合成</h1>
            <Divider />
            <h2>标题</h2>
            <TextField
                label="输入语音标题"
                value={title}
                onChange={handleTitleChange}
                sx={{ width: '100%' }}
            />
            <h2>文本</h2>
            <TextField
                label="输入文本框"
                multiline
                maxRows={20}
                value={text}
                onChange={handleChange}
                sx={{ width: '100%', height: '100%' }}
            />
            <Divider />
            <h2>模型选择</h2>
            <FormControl fullWidth>
                <InputLabel >模型</InputLabel>
                <Select
                    key={models.model_name}
                    label="Model"
                    sx={{ width: '100%', fontFamily: 'GenSenRouneded-B' }}
                    onChange={handleChoose}
                >
                    {models.map((model, index) => (
                        <MenuItem key={index} value={model.model_name} sx={{ fontFamily: 'GenSenRouneded-B' }}>
                            {model.model_name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button variant="contained" onClick={handleSynthesize} sx={{ width: '100%', marginTop: '5px' }}>合成</Button>

        </Box>
    );
}
