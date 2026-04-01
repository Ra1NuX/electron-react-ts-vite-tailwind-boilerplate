import { contextBridge, ipcRenderer } from "electron";
import type { SystemInfo } from "@core/lib/types";

export const api = {
  getSystemInfo: (): Promise<SystemInfo> => ipcRenderer.invoke("app:system-info"),
  maximize: () => ipcRenderer.send("app:maximize"),
  minimize: () => ipcRenderer.send("app:minimize"),
  close: () => ipcRenderer.send("app:close"),
  onToggleTitlebar: (callback: (show: boolean) => void) =>
    ipcRenderer.on("toggle-titlebar", (_event, show) => callback(show)),
};

contextBridge.exposeInMainWorld("electron", api);
