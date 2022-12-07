import { useUser, useGlobal, useRoom } from "@/hooks/index";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Dispatch, SetStateAction } from "react";
import Dropdown from "./Dropdown";

interface OptionsProps {
  setShowOption: Dispatch<SetStateAction<boolean>>;
}
const Options = ({ setShowOption }: OptionsProps) => {
  const { toggleShowInfo } = useGlobal();
  const { logout, user } = useUser();
  const { room } = useRoom();

  return (
    <div
      className={`options flex justify-between flex-col absolute z-50 bg-white font-semibold text-gray-700 bottom-0 translate-y-[105%] overflow-hidden left-0 right-0 rounded-md`}
    >
      <ul>
        {user?.uid === room.uid && (
          <li
            onClick={() => {
              toggleShowInfo(true);
            }}
            className="hover:opacity-80  cursor-pointer flex gap-2 py-3 px-2 items-center border-b-[1px] border-gray-200"
          >
            <span>
              <AccountCircleIcon fontSize="small" />
            </span>
            <span className="text-sm pt-0.5">Your information</span>
          </li>
        )}

        <li className="">
          <Dropdown />
        </li>
        <li
          onClick={async () => {
            await logout();
            setShowOption(false);
          }}
          className="hover:opacity-80 cursor-pointer flex gap-2 py-3 px-2 items-center border-b-[1px] border-gray-200"
        >
          <span>
            <ExitToAppIcon fontSize="small" />
          </span>
          <span className="text-sm pt-0.5">Logout</span>
        </li>
      </ul>
      <button
        onClick={() => {
          setShowOption(false);
        }}
        className="hover:opacity-90 rounded-b-md text-black w-full font-semibold py-1 flex justify-center"
      >
        <CloseIcon fontSize="small" />
      </button>
    </div>
  );
};

export default Options;
