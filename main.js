const { app, BrowserWindow } = require("electron");
const { spawn } = require("child_process");
const path = require("path");
const axios = require("axios");
const fs = require("fs");

class PythonEnvironment {
    constructor() {
        this.isWindows = process.platform === "win32";
        // 修改为新的路径
        this.envPath = path.join(__dirname, "resources", process.platform === "darwin" ? "macOS_arm64" : "Windows_x64");
        this.flaskProcess = null;

        // 设置 Python 解释器路径
        if (this.isWindows) {
            this.pythonPath = path.join(this.envPath, "python.exe");
            this.altPythonPaths = [
                path.join(this.envPath, "Scripts", "python.exe"),
                path.join(this.envPath, "bin", "python.exe"),
            ];
        } else {
            // MacOS 路径
            this.pythonPath = path.join(this.envPath, "bin", "python3.10");
            this.altPythonPaths = [
                path.join(this.envPath, "bin", "python3"),
                path.join(this.envPath, "bin", "python"),
            ];
        }
    }

    findPythonExecutable() {
        // 检查主路径
        if (fs.existsSync(this.pythonPath)) {
            return this.pythonPath;
        }

        // 检查备选路径
        for (const altPath of this.altPythonPaths) {
            if (fs.existsSync(altPath)) {
                this.pythonPath = altPath;
                return altPath;
            }
        }

        throw new Error("Python executable not found in: " + this.envPath);
    }

    async initialize() {
        // 确保 python_env 目录存在
        if (!fs.existsSync(this.envPath)) {
            throw new Error("Python environment not found at: " + this.envPath);
        }

        this.findPythonExecutable();

        // 设置环境变量
        if (this.isWindows) {
            const scriptsPath = path.join(this.envPath, "Scripts");
            const binPath = path.join(this.envPath, "bin");
            process.env.PATH = `${scriptsPath};${binPath};${process.env.PATH}`;
        } else {
            // MacOS 特定配置
            process.env.PATH = `${path.join(this.envPath, "bin")}:${process.env.PATH}`;
            process.env.DYLD_LIBRARY_PATH = path.join(this.envPath, "lib");
        }

        process.env.PYTHONHOME = this.envPath;
        process.env.PYTHONPATH = this.envPath;
    }

    startFlaskServer() {
        return new Promise((resolve, reject) => {
            console.log("Starting Flask server...");

            // Flask 应用路径
            const flaskAppPath = path.join(__dirname, "stellarcore", "app.py");

            if (!fs.existsSync(flaskAppPath)) {
                reject(new Error(`Flask app not found at: ${flaskAppPath}`));
                return;
            }

            const options = {
                stdio: "inherit",
                cwd: __dirname,
                env: process.env
            };

            if (!this.isWindows) {
                options.chmod = 0o755;
            }

            console.log(`Starting Flask with Python: ${this.pythonPath}`);
            console.log(`Flask app path: ${flaskAppPath}`);

            this.flaskProcess = spawn(this.pythonPath, [flaskAppPath], options);

            this.flaskProcess.on("error", (err) => {
                console.error("Failed to start Flask process:", err);
                reject(err);
            });

            // 健康检查
            const checkFlask = setInterval(async () => {
                try {
                    const response = await axios.get("http://127.0.0.1:5001/health");
                    if (response.status === 200 && response.data.status === "healthy") {
                        clearInterval(checkFlask);
                        console.log("Flask server is running.");
                        resolve();
                    }
                } catch (error) {
                    console.log("Waiting for Flask server to start...");
                }
            }, 500);

            // 30秒超时
            setTimeout(() => {
                clearInterval(checkFlask);
                reject(new Error("Flask server startup timeout after 30 seconds"));
            }, 30000);
        });
    }

    cleanup() {
        if (this.flaskProcess) {
            console.log("Shutting down Flask server...");
            this.flaskProcess.kill();
            this.flaskProcess = null;
        }
    }
}

let mainWindow;
let pythonEnv = new PythonEnvironment();

const createMainWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1200,  // 调整窗口大小
        height: 800,
        webPreferences: {
            contextIsolation: true,
        },
    });

    // 加载 React 构建文件
    const reactBuildPath = path.join(__dirname, "nebulaview", "build", "index.html");
    mainWindow.loadFile(reactBuildPath);

    if (process.env.NODE_ENV === "development") {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
};

app.on("ready", async () => {
    try {
        console.log("Initializing Python environment...");
        await pythonEnv.initialize();
        console.log("Starting Flask application...");
        await pythonEnv.startFlaskServer();
        console.log("Creating Electron window...");
        createMainWindow();
    } catch (error) {
        console.error("Application startup failed:", error);
        app.quit();
    }
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createMainWindow();
    }
});

app.on("quit", () => {
    pythonEnv.cleanup();
});

process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error);
    pythonEnv.cleanup();
    app.quit();
});