import { app, BrowserWindow } from "electron";

import handleProtocol, { registerProtocol } from "@core/lib/handle-protocol";
import createWindow from "@core/lib/create-window";
import registerIPC from "@core/lib/register-ipc";
import isDev from "@core/lib/is-dev";

if (!isDev) {
  registerProtocol();
}

app.whenReady().then(() => {
  if (!isDev) {
    handleProtocol();
  }

  const win = createWindow();
  registerIPC(win);

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      const newWin = createWindow();
      registerIPC(newWin);
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
