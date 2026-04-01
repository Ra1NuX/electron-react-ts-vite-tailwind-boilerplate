import { BrowserWindow } from "electron";

const maximize = (win: BrowserWindow) => {
  if (!win?.isMaximized()) {
    win?.maximize();
  } else {
    win?.unmaximize();
  }
};

export default maximize;
