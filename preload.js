const { contextBridge, ipcRenderer } = require("electron");

// Определение API для доступа из процесса рендеринга
contextBridge.exposeInMainWorld("api", {
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  receive: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  },
});
