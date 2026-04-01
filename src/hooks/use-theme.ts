import { useEffect, useState } from "react";

const STORAGE_KEY = "theme";

const getInitialTheme = (): boolean => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored !== null) return stored === "dark";
  return document.documentElement.classList.contains("dark");
};

const useTheme = () => {
  const [dark, setDark] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light");
  }, [dark]);

  const toggle = () => setDark((d) => !d);

  return { dark, toggle };
};

export default useTheme;
