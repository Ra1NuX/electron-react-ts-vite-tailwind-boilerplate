import { app, BrowserWindow, ipcMain } from "electron";
import minimize from "@core/lib/buttons/minimize";
import maximize from "@core/lib/buttons/maximize";

const registerIPC = (win: BrowserWindow) => {
  ipcMain.on("app:minimize", () => minimize(win));
  ipcMain.on("app:maximize", () => maximize(win));
  ipcMain.on("app:close", () => app.quit());

  ipcMain.handle("app:system-info", () => ({
    platform: process.platform,
    arch: process.arch,
    electronVersion: process.versions.electron,
    chromeVersion: process.versions.chrome,
    nodeVersion: process.versions.node,
    appVersion: app.getVersion(),
  }));
};

export default registerIPC;
