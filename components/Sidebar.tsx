import AnimationRoundedIcon from "@mui/icons-material/AnimationRounded";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import TuneIcon from "@mui/icons-material/Tune";
import WallpaperRoundedIcon from "@mui/icons-material/WallpaperRounded";
import { useState } from "react";
import ChangeSet from "./ChangeSet";
import Clock from "./Tools";
import Mood from "./Mood";
import Playlist from "./Playlist";
import { useRoom, useUser } from "@/hooks/index";
const Sidebar = () => {
  // State
  const [isMood, setIsMood] = useState(false);
  const [isPlaylist, setIsPlaylist] = useState(false);
  const [isChangeSet, setIsChangeSet] = useState(false);
  const [isClock, setIsClock] = useState(false);

  // Context
  const { user } = useUser();
  const { room } = useRoom();
  return (
    <div className="absolute z-30 rounded-full border-[1px] border-gray-500 bg-black bg-opacity-30 right-4 top-[50%] -translate-y-1/2">
      <div className="">
        <ul>
          <li
            className={`
            ${isMood && "bg-black bg-opacity-90"}
            px-4 py-6 h-24 w-16 text-white relative border-b-2 text-2xl border-gray-500 hover:bg-black hover:bg-opacity-90 rounded-tl-full rounded-tr-full transition-all ease-in-out duration-300 cursor-pointer`}
          >
            {/* Icon */}
            <button
              onClick={() => {
                setIsMood(!isMood);
                setIsPlaylist(false);
                setIsChangeSet(false);
                setIsClock(false);
              }}
              className="absolute top-0 bottom-0 left-0 right-0 outline-none w-full"
            >
              <TuneIcon fontSize="large" />
            </button>

            {/* Content */}
            {isMood && <Mood />}
          </li>
          <li
            className={`
            ${isPlaylist && "bg-black bg-opacity-90"}
            px-4 py-6 text-white relative border-b-2 text-2xl border-gray-500 hover:bg-black hover:bg-opacity-90 transition-all ease-in-out duration-300 cursor-pointer h-20`}
          >
            {/* Icon */}
            <button
              onClick={() => {
                setIsMood(false);
                setIsPlaylist(!isPlaylist);
                setIsChangeSet(false);
                setIsClock(false);
              }}
              className="absolute top-0 bottom-0 left-0 right-0 outline-none w-full"
            >
              <AnimationRoundedIcon fontSize="large" />
            </button>

            {/* Content */}
            {isPlaylist && <Playlist />}
          </li>

          <li
            className={`
            ${isChangeSet && "bg-black bg-opacity-90"} ${
              user?.uid !== room.uid
                ? "cursor-not-allowed"
                : "hover:bg-black hover:bg-opacity-90 transition-all ease-in-out duration-300 cursor-pointer"
            }
            px-4 py-6 w-16 text-white relative border-b-2 text-2xl border-gray-500 h-20`}
          >
            {/* Icon */}
            <button
              onClick={() => {
                setIsMood(false);
                setIsPlaylist(false);
                setIsClock(false);
                if (user?.uid === room.uid) setIsChangeSet(!isChangeSet);
              }}
              className="absolute top-0 bottom-0 left-0 right-0 outline-none w-full"
            >
              <WallpaperRoundedIcon fontSize="large" />
            </button>
            {/* Content */}
            {isChangeSet && <ChangeSet />}
          </li>
          <li
            className={`
            ${isClock && "bg-black bg-opacity-90"}
            px-4 py-6 h-24 w-16 text-white relative text-2xl border-gray-500 hover:bg-black hover:bg-opacity-90 rounded-bl-full rounded-br-full transition-all ease-in-out duration-300 cursor-pointer`}
          >
            {/* Icon */}
            <button
              onClick={() => {
                setIsMood(false);
                setIsPlaylist(false);
                setIsChangeSet(false);
                setIsClock(!isClock);
              }}
              className="absolute top-0 bottom-0 left-0 right-0 outline-none w-full"
            >
              <AutoFixHighIcon fontSize="large" />
            </button>
            {/* Content */}
            {isClock && <Clock />}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
