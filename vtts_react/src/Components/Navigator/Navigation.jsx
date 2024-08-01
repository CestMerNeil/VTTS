import React from 'react';
import { Box, Button, Stack, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Divider from '@mui/material/Divider';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

import FufuLogo from './FUFU.jpg'

export default function Navigation() {

  return (
    <Box sx={{ width: '100%', height: '100%', borderRadius: '25px' }}>
      <Stack direction="column" spacing={2} sx={{ margin: '25px' }}>
        <Divider />
        <CardMedia
          component="img"
          image={FufuLogo}
          alt="FUFU Logo"
          sx={{ width: '100%', height: 'auto', borderRadius: '25px', borderColor: 'primary.main', border: 1 }}
        />
        <Divider />
        <Button variant="contained" component={Link} to="/" startIcon={< HomeRoundedIcon />}>
          语音合成
        </Button>
        <Divider />
        <Button variant="contained" component={Link} to="/player" startIcon={<LibraryMusicIcon /> } >播放器</Button>
        <Divider />
        <Button variant="contained" component={Link} to="/Settings" startIcon={<SettingsRoundedIcon />}>
          设置
        </Button>
        
        <Divider />
        <Button variant="contained" component={Link} to="/thanks" startIcon={< FavoriteIcon />}>
          特别鸣谢
        </Button>
        <Divider />
      </Stack>
    </Box>
  );
}
