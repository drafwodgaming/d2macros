const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");

app.on("ready", () => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    transparent: true,
    show: false,
    icon: __dirname + "/Assets/icon.ico",
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"), // Путь к preload-скрипту
      devTools: true,
    },
  });

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "main.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  ipcMain.on("save-settings", (_, { entries }) => {
    entries.forEach(([key, value]) => {
      win.webContents.executeJavaScript(
        `localStorage.setItem("${key}", "${value}");`
      );
    });
  });

  win.once("ready-to-show", () => {
    win.show();
    // Показать окно, когда оно будет готово
  });

  // win.webContents.openDevTools();
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
