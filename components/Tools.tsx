import { useTool } from "@/hooks/index";
import AccessAlarmRoundedIcon from "@mui/icons-material/AccessAlarmRounded";
import EventNoteIcon from "@mui/icons-material/EventNote";
import HistoryIcon from "@mui/icons-material/History";
import LockIcon from "@mui/icons-material/Lock";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
const Tools = () => {
  const { isStartSession, startSession, setShowTimer } = useTool();
  return (
    <div className="absolute px-8 scrollbar-hidden w-[350px] h-[350px] overflow-scroll -top-[200px] bg-opacity-90  rounded-3xl -left-2 bottom-0 -translate-x-full bg-black p-4">
      <h1 className="font-bold text-white text-2xl">Productivity</h1>
      <div className="my-4">
        <button
          onClick={() => {
            startSession();
          }}
          className="w-full rounded-lg mb-4 py-4 gap-4 px-2 flex items-center bg-[#141414] hover:bg-opacity-70"
        >
          {!isStartSession ? (
            <PlayCircleFilledIcon className="text-[#434343]" />
          ) : (
            <PauseCircleOutlineIcon className="text-[#434343]" />
          )}
          <span className="text-base">
            {isStartSession ? "Stop Working" : "Start Session"}
          </span>
          {/* <LockIcon className="ml-auto" /> */}
        </button>
        <div
          onClick={() => {
            setShowTimer(true);
          }}
          className="rounded-lg mb-4 py-4 gap-4 px-2 flex items-center bg-[#141414] hover:bg-opacity-70"
        >
          <AccessAlarmRoundedIcon className="text-[#434343]" />
          <span className="text-base">Timer</span>
          {/* <LockIcon className="ml-auto" /> */}
        </div>
        <div className="rounded-lg mb-4 py-4 gap-4 px-2 flex items-center bg-[#141414] hover:bg-opacity-70">
          <EventNoteIcon className="text-[#434343]" />
          <span className="text-base">Notes</span>
          <LockIcon className="ml-auto" />
        </div>
        <div className="rounded-lg mb-4 py-4 gap-4 px-2 flex items-center bg-[#141414]">
          <HistoryIcon className="text-[#434343]" />
          <span className="text-base">History</span>
          <LockIcon className="ml-auto" />
        </div>
      </div>
    </div>
  );
};

export default Tools;
