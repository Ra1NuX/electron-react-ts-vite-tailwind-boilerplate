import useElectron from "@/hooks/use-electron";

const CloseButtons = () => {
  const electron = useElectron();

  return (
    <div className="flex items-center justify-end h-full no-drag gap-1 w-fit">
      <button
        onClick={() => electron?.minimize()}
        className="tileStyleButton"
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 16 16"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15 8H1V7h14v1z"></path>
        </svg>
      </button>
      <button
        onClick={() => electron?.maximize()}
        className="tileStyleButton"
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 16 16"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.5 4l.5-.5h8l.5.5v8l-.5.5H4l-.5-.5V4zm1 .5v7h7v-7h-7z"
          ></path>
        </svg>
      </button>
      <button
        onClick={() => electron?.close()}
        className="tileStyleButton hover:bg-close-red dark:hover:bg-close-red hover:text-white"
      >
        <span className="text-2xl font-extralight mb-1.5">&times;</span>
      </button>
    </div>
  );
};

export default CloseButtons;
