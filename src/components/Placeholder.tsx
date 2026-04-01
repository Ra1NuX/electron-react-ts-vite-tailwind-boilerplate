import useSystemInfo from "@/hooks/use-system-info";
import platformNames from "@/lib/platform-names";

const Placeholder = () => {
  const info = useSystemInfo();

  return (
    <div className="flex flex-col items-center gap-6 select-none">
      <h1 className="text-4xl font-bold dark:text-white text-main-onyx tracking-tight">
        Ready to build.
      </h1>
      <p className="text-sm font-normal dark:text-white/40 text-main-onyx/40">
        Edit <code className="dark:text-white/60 text-main-onyx/60 font-mono bg-main-onyx/5 dark:bg-white/5 px-1.5 py-0.5 rounded">src/App.tsx</code> to get started
      </p>

      {info && (
        <div className="mt-4 grid grid-cols-3 gap-3 text-xs font-normal">
          <InfoCard label="Electron" value={`v${info.electronVersion}`} />
          <InfoCard label="Chromium" value={`v${info.chromeVersion}`} />
          <InfoCard label="Node" value={`v${info.nodeVersion}`} />
          <InfoCard label="Platform" value={platformNames[info.platform] ?? info.platform} />
          <InfoCard label="Arch" value={info.arch} />
          <InfoCard label="App" value={`v${info.appVersion}`} />
        </div>
      )}
    </div>
  );
};

const InfoCard = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col items-center gap-1 px-4 py-3 rounded-lg dark:bg-white/5 bg-main-onyx/5 min-w-[100px]">
    <span className="dark:text-white/30 text-main-onyx/30 uppercase tracking-widest" style={{ fontSize: "0.65rem" }}>
      {label}
    </span>
    <span className="dark:text-white/70 text-main-onyx/70 font-mono">
      {value}
    </span>
  </div>
);

export default Placeholder;
