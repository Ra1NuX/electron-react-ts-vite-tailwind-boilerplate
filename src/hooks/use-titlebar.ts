import { useEffect, useState } from "react";
import useElectron from "@/hooks/use-electron";

const useTitlebar = () => {
  const electron = useElectron();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!electron) return;
    electron.onToggleTitlebar(setVisible);
  }, [electron]);

  return visible;
};

export default useTitlebar;
