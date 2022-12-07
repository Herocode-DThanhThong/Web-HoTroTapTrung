import { Dispatch, SetStateAction } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";

interface NotificationProps {
  setShowGroup: Dispatch<SetStateAction<boolean>>;
}
const Notification = ({ setShowGroup }: NotificationProps) => {
  return (
    <div
      className={`absolute flex justify-between flex-col scrollbar-hidden z-50 h-[280px] overflow-y-auto bg-white font-semibold text-gray-700 bottom-0 translate-y-[105%] overflow-hidden left-0 right-0 rounded-md`}
    >
      <div className="">
        <div className="sticky z-50 top-0 bg-gradient-to-r from-[#e18660e6] to-[#f4ca5de6] flex flex-col  gap-2 py-3 px-2 items-center">
          <p className="text-center capitalize text-white font-semibold">
            Your Room
          </p>
        </div>
        <ul>
          <li className="cursor-pointer flex flex-col  gap-2 py-3 px-2 items-center border-b-[1px] border-gray-200">
            <p className="text-left capitalize text-gray-900 font-semibold">
              Name: Herocode
            </p>
            <p className="text-left truncate w-[90%] text-gray-900 font-semibold">
              Email: herocode@gmail.com
            </p>
            <div className="flex gap-2">
              <button className="text-sm px-3 py-1 bg-red-500 rounded-md text-white">
                Remove
              </button>
            </div>
          </li>
        </ul>
      </div>
      <button
        onClick={() => {
          setShowGroup(false);
        }}
        className="hover:opacity-90 bg-white rounded-b-md  text-black border-t-[1px] sticky bottom-0 z-20 w-full font-semibold py-1 flex justify-center"
      >
        <CloseIcon fontSize="small" />
      </button>
    </div>
  );
};

export default Notification;
