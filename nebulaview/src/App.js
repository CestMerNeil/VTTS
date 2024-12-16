import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideNavbar from "./components/SideNavbar";
import Home from "./components/Home";
import Settings from "./components/Settings";
import AudioPlayer from "./components/AudioPlayer";
import TTSGenerator from "./components/TTSGenerator";

function App() {
  return (
    <Router>
      <div className="flex h-screen overflow-hidden">
        <SideNavbar />
        <div className="flex-1 overflow-auto bg-base-200">
          <div className="p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/audio" element={<AudioPlayer />} />
              <Route path="/generate" element={<TTSGenerator />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;