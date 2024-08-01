import { React, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import Divider from '@mui/material/Divider';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import Swal from 'sweetalert2';

//const { ipcRenderer } = window.require('electron');

export default function Settings() {

    /* 输入模型名称 */
    const [modelName, setModelName] = useState(null);
    const handleModelNameChange = (event) => {
        setModelName(event.target.value);
    };

    /* 上传模型 */
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChoose = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileUpload = () => {
        if (modelName && selectedFile) {
            // 上传逻辑
            // const reader = new FileReader();
            // reader.onloadend = () => {
            //     ipcRenderer.send('upload-model', {
            //         name: selectedFile.name,
            //         content: reader.result
            //     })
            // };
            // reader.readAsDataURL(selectedFile);
        } else {
            if (!selectedFile && !modelName) {
                Swal.fire({
                    icon: 'error',
                    title: '大事不妙(｡ì _ í｡)',
                    text: '请输入模型名称并选择模型文件'
                });
            } else if (!selectedFile) {
                Swal.fire({
                    icon: 'error',
                    title: '大事不妙(｡ì _ í｡)',
                    text: '请选择模型文件'
                });
            } else if (!modelName) {
                Swal.fire({
                    icon: 'error',
                    title: '大事不妙(｡ì _ í｡)',
                    text: '请输入模型名称'
                });
            }
        }
    };

    return (
        <Box sx={{ margin: '3%', overflow: 'auto' }}>
            <h1>通用设置</h1>
            <h3>该页面当前不可用</h3>
            <Divider />
            <h2>模型上传</h2>
            <TextField
                label="模型名称"
                sx={{ width: '100%' }}
                onChange={handleModelNameChange}
            />
            
            <Button component="label" variant="contained" sx={{ width: '100%', marginTop: '5px' }} onClick={handleFileUpload} startIcon={< CloudUploadIcon />}>
                上传
            </Button>
            <h2>软件更新</h2>
            <Button variant="contained" sx={{ width: '100%' }}>检查更新</Button>
        </Box>
    );
}
