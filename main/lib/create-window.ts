import { BrowserWindow } from "electron";
import path from "path";
import getURL from "@core/lib/get-url";

const createWindow = (): BrowserWindow => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    titleBarStyle: "hidden",
    icon: path.join(__dirname, "renderer", "icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      nodeIntegration: true,
      contextIsolation: true,
    },
  });

  win.on("enter-full-screen", () => {
    win.webContents.send("toggle-titlebar", false);
  });

  win.on("leave-full-screen", () => {
    win.webContents.send("toggle-titlebar", true);
  });

  const url = getURL("/");
  win.loadURL(url);

  return win;
};

export default createWindow;
