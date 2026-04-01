import useElectron from "@/hooks/use-electron";
import useTitlebar from "@/hooks/use-titlebar";
import CloseButtons from "@/components/CloseButtons";
import ThemeToggle from "@/components/ThemeToggle";

const Header = () => {
  const electron = useElectron();
  const visible = useTitlebar();

  return (
    <nav className={`h-10 dark:bg-main-onyx bg-light-bg drag z-100 relative px-1 pl-2 flex flex-row items-center box-content ${visible ? "" : "hidden"}`}>
      <img src="/icon.png" alt="icon" className="h-6 shrink-0" />
      <div className="flex-1" />
      <div className="flex items-center gap-1 no-drag">
        <ThemeToggle />
      </div>
      {electron && <CloseButtons />}
    </nav>
  );
};

export default Header;
