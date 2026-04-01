import { useEffect, useState } from "react";
import useElectron from "@/hooks/use-electron";
import type { SystemInfo } from "../../main/lib/types";

const useSystemInfo = () => {
  const electron = useElectron();
  const [info, setInfo] = useState<SystemInfo | null>(null);

  useEffect(() => {
    electron?.getSystemInfo().then(setInfo);
  }, [electron]);

  return info;
};

export default useSystemInfo;
