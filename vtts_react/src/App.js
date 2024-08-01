import React from 'react';
import { Box, Card } from '@mui/material';
import Navigation from './Components/Navigator/Navigation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Settings from './Components/Pages/Settings';
import Player from './Components/Pages/Player';
import TTS from './Components/Pages/TTS';
import Thanks from './Components/Pages/Thanks';

import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#EDC7B7',
    },
    secondary: {
      main: '#BAB2B5',
    },
    background: {
      default: '#EEE2DC',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ width: '100%', height: '100vh', display: 'flex', bgcolor: '#EEE2DC' }}>
          <Card sx={{ flexGrox: 1, width: '30%', margin: '25px', borderRadius: '25px', overflow: 'auto' }}>
            <Navigation />
          </Card>

          <Card sx={{ flexGrow: 1, padding: '10px', margin: '25px', marginLeft: '0', overflow: 'auto', borderRadius: '25px' }}>
            <Routes>
              <Route path="/Settings" element={<Settings />}/>
              <Route path="/" element={<TTS />} />
              <Route path="/player" element={<Player />} />
              <Route path="/thanks" element={<Thanks />} />
            </Routes>
          </Card>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
