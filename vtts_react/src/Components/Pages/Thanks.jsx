import React from "react";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

export default function Thanks() {
    return (
        <Box sx={{ margin: '3%', borderColor: 'black' }}>
            <h1>Thanks</h1>
            <Divider />
            <h2>感谢以下开源项目</h2>
            <ul>
                <li>
                    <a href="https://github.com/coqui-ai/TTS">
                        Coqui TTS
                    </a>
                </li>
            </ul>
        </Box>
    );
}