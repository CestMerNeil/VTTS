const { app, BrowserWindow, ipcMain } = require('electron');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const audioPath = path.join(__dirname, '/vtts_react/public/output/');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 750,
    minWidth: 800,
    minHeight: 500,
    resizable: true, // 调整窗口大小
    aspectRatio: 8 / 5,
    //titleBarStyle: 'hidden',
    webPreferences: {
      sandbox: true, // 开启沙箱模式
      nodeIntegration: false, // While using preload, it's recommended to disable nodeIntegration
      contextIsolation: true, // Protect against prototype pollution
      preload: path.join(__dirname + '/preload.js')
    }
  });

  win.loadURL('http://localhost:3000'); // React 开发服务器的 URL
}

// Get the wav file path
ipcMain.handle('get-audio-path',(event, arg) => {
  return path.join('/output/', arg);
})

// Run Python script
ipcMain.on('synthesize-tts', (event, arg) => {
  const {text, modelPath, modelConfig, title } = arg;
  console.log("arg: ", arg);

  let modelPath_Global = path.join(__dirname, modelPath);
  let modelConfig_Global = path.join(__dirname, modelConfig);
  let outputDir_Global = path.join(__dirname, '/vtts_react/public/output/');
  outputDir_Global = path.join(outputDir_Global, title) + '.wav';
  console.log("modelPath_Global: ", modelPath_Global);
  console.log("modelConfig_Global: ", modelConfig_Global);
  console.log("outputDir_Global: ", outputDir_Global);

  const python_path = '/Users/neil/miniconda3/envs/tts_test/bin/python';
  const python_tts = spawn(python_path, ['./TTS/tts.py', text, modelPath_Global, modelConfig_Global, outputDir_Global]);
  python_tts.stdout.on('data', (data) => {
    const output = data.toString();
    console.log(output);
    console.log("开始测试返回信息");
    if(output.includes('Done')) {
      console.log("返回信息中含有Done");
      event.sender.send('synthesize-tts-reply', true);
      console.log("发送成功");
    }
  });
  python_tts.stderr.on('data', (data) => {
    console.error(data.toString());
  });
  python_tts.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
})


app.whenReady().then(async () => {
  createWindow();

  ipcMain.handle('get-wav-files', async () => {
    return await readWavFiles()
  })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

const readWavFiles = () => {
  return fs.promises.readdir(audioPath)
    .then(files => files.filter(file => path.extname(file) === '.wav'))
    .catch(err => console.log(err));
};