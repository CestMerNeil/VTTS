const { app, BrowserWindow } = require("electron");
const { spawn } = require("child_process");
const path = require("path");
const axios = require("axios");

let mainWindow;
let flaskProcess;

// 启动 Flask 后端
const startFlask = () => {
    return new Promise((resolve, reject) => {
        console.log("Starting Flask...");
        flaskProcess = spawn("python", ["stellarcore/app.py"], {
            stdio: "inherit", // 打印 Flask 的输出
            cwd: path.join(__dirname), // 确保路径正确
        });

        flaskProcess.on("error", (err) => {
            console.error("Failed to start Flask process:", err);
            reject(err);
        });

        // 检测 Flask 服务是否启动完成
        const checkFlask = setInterval(async () => {
            try {
                const response = await axios.get("http://127.0.0.1:5001/health");
                if (response.status === 200 && response.data.status === "healthy") {
                    clearInterval(checkFlask);
                    console.log("Flask started successfully.");
                    resolve();
                }
            } catch (error) {
                console.log("Waiting for Flask to start...");
            }
        }, 500); // 每 500ms 检查一次
    });
};

// 创建 Electron 窗口
const createMainWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            contextIsolation: true,
        },
    });

    // 加载 React 构建文件
    mainWindow.loadFile(path.join(__dirname, "nebulaview/build/index.html"));

    // 打开开发者工具（调试用，可删除）
    mainWindow.webContents.openDevTools();

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
};

// 监听 Electron 生命周期
app.on("ready", async () => {
    try {
        await startFlask(); // 确保 Flask 启动完成
        createMainWindow(); // 创建 Electron 窗口
    } catch (error) {
        console.error("Failed to start Flask:", error);
        app.quit();
    }
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("quit", () => {
    if (flaskProcess) {
        flaskProcess.kill(); // 确保 Flask 进程随 Electron 退出
    }
});