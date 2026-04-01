import { BrowserWindow } from "electron";

const minimize = (win: BrowserWindow) => {
  win?.minimize();
};

export default minimize;
