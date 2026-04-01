export {};
import { api } from "../main/preload";

declare global {
  interface Window {
    electron: typeof api;
  }
}
