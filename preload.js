const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  // 发送消息到主进程
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },

  // 从主进程接收消息
  receive: (channel, func) => {
    // 安全性检查：确保 channel 符合预期的模式
    const validChannels = ['synthesize-tts-reply', /* 其他合法的 channels */];
    if (validChannels.includes(channel)) {
      // 移除既有的监听器（防止重复添加）
      ipcRenderer.removeAllListeners(channel);
      // 添加新的监听器
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },

  getWavFiles: () => ipcRenderer.invoke('get-wav-files'),
  getAudioPath: (arg) => ipcRenderer.invoke('get-audio-path', arg)
});