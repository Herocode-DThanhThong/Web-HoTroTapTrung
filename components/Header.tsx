import { BackgroundContext } from "@/contexts/BackgroundContext";
import { useGlobal, useRoom, useTool, useUser } from "@/hooks/index";
import { toggleFullScreen } from "@/utils/toggleFullScreen";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import GroupIcon from "@mui/icons-material/Group";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { Avatar } from "@mui/material";
import AvatarGroup from "@mui/material/AvatarGroup";
import Badge from "@mui/material/Badge";
import { deepPurple } from "@mui/material/colors";
import { useContext, useState } from "react";
import Clock from "./Clock";
import EnterRoomInput from "./EnterRoomInput";
import Options from "./Options";
import SwitchCT from "./SwitchCT";
const Header = () => {
  // State
  const [showOption, setShowOption] = useState(false);
  const [showNotification, setShowGroup] = useState(true);

  // Context
  const { toggleTheme } = useContext(BackgroundContext);
  const { toggleShowLogin } = useGlobal();
  const { isLogin, user } = useUser();
  const { room, leaveRoom } = useRoom();
  const { isStartSession } = useTool();

  const handleChangeBg = (toggled: boolean) => {
    // toggled = true -> light
    // toggled = false -> dark
    if (toggled) {
      toggleTheme("light");
    } else {
      toggleTheme("dark");
    }
  };

  return (
    <header>
      <div className="flex justify-between py-2 px-4 items-center">
        {/* Logo + Name */}
        <div className="inline-block p-1 mx-2">
          <div className="flex items-center gap-2 p-2 bg-white rounded-lg">
            <div className="">
              <h1 className="text-gray-600 font-semibold tracking-widest text-xl">
                LofiStudy
              </h1>
            </div>
            <div className="border-l-2 items-center px-2 flex gap-4">
              <p>
                {!isLogin && !user
                  ? "My Room"
                  : `${
                      room.name.length > 10
                        ? room.name.slice(0, 10) + "..."
                        : room.name
                    }'s Room`}
              </p>

              {isLogin && (
                <div className="flex gap-2">
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    badgeContent={<span>🗝️</span>}
                  >
                    <Avatar
                      sx={{
                        bgcolor: deepPurple[500],
                        width: 26,
                        height: 26,
                        fontSize: "0.8rem",
                        textTransform: "uppercase",
                      }}
                      alt="Travis Howard"
                    >
                      {room.name?.slice(0, 1)}
                    </Avatar>
                  </Badge>
                  <AvatarGroup max={3}>
                    {room.guests.map((user, index) => (
                      <Avatar
                        key={index}
                        sx={{
                          bgcolor: deepPurple[500],
                          width: 24,
                          height: 24,
                          fontSize: "0.8rem",
                          textTransform: "uppercase",
                        }}
                      >
                        {user?.displayName.slice(0, 1)}
                      </Avatar>
                    ))}
                  </AvatarGroup>
                </div>
              )}
              {/* user?.uid !== room.uid => case: user is locating in another room */}
              {isLogin && user?.uid !== room.uid ? (
                <button
                  onClick={() => {
                    leaveRoom();
                  }}
                  className="font-semibold p-1 capitalize px-3 bg-red-600 hover:opacity-80 transition-all ease-in-out duration-500 rounded-md text-white text-sm"
                >
                  Leave
                </button>
              ) : (
                <button className="font-semibold p-1 capitalize px-3 bg-blue-600 hover:opacity-80 transition-all ease-in-out duration-500 rounded-md text-white text-sm">
                  Invite
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="flex items-center gap-4">
          {/* Start Session Work */}
          {isStartSession ? (
            <div className="relative flex gap-2 items-center">
              <div className="w-4 relative h-4 rounded-full bg-green-400">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              </div>
              <span className="text-white font-bold ">Working</span>
            </div>
          ) : null}

          {/* Current time */}
          <div className="px-4 text-white font-semibold p-1 bg-white bg-opacity-30 rounded-md">
            <Clock />
          </div>

          {/* Switch */}

          {/* user?.uid !== room.uid && isLogin => case: user is locating in another room */}
          <div className="">
            {user?.uid !== room.uid && isLogin ? (
              <></>
            ) : (
              <SwitchCT
                checked={room.background.theme === "light" ? true : false}
                handleChangeBg={handleChangeBg}
              />
            )}
          </div>

          {/* Upgrade */}
          <div className="px-2 gap-2 flex items-center p-1 bg-gradient-to-r cursor-pointer hover:opacity-80 transition-all ease-in-out duration-300 text-white font-bold capitalize text-[14px] from-[#e18660e6] to-[#f4ca5de6] py-2 rounded-md">
            <span className="text-2xl">🚀</span>
            <span>Upgrade to premium</span>
          </div>

          {/* Sign In */}
          {!isLogin && (
            <button
              onClick={() => {
                toggleShowLogin(true);
              }}
              type="button"
              className="px-4 text-white capitalize hover:opacity-70 font-bold p-1 bg-white bg-opacity-30 rounded-md"
            >
              Sign In
            </button>
          )}

          {/* Enter another room */}
          {isLogin && user?.uid === room.uid && <EnterRoomInput />}

          {/* Options controls */}
          <div className="inline-block p-1 mx-2">
            <div className="flex relative items-center gap-2 p-2 py-2 bg-white rounded-lg">
              <div className="">
                <span>2</span>
                <span>🔥</span>
              </div>
              <div className="border-l-2 items-center px-2 flex gap-4">
                <button className="">
                  <VolumeUpIcon fontSize="small" />
                </button>
                <button
                  onClick={() => {
                    toggleFullScreen();
                  }}
                >
                  <FullscreenIcon fontSize="small" color="inherit" />
                </button>

                <button
                  onClick={() => {
                    if (isLogin) {
                      setShowGroup(!showNotification);
                      setShowOption(false);
                    }
                  }}
                  className=""
                >
                  <Badge
                    badgeContent={isLogin ? room.guests.length + 1 : 0}
                    color="primary"
                  >
                    <GroupIcon color="inherit" fontSize="small" />
                  </Badge>
                </button>
              </div>
              <button
                onClick={() => {
                  if (isLogin) {
                    setShowOption(!showOption);
                    setShowGroup(false);
                  }
                }}
                className="border-l-2 items-center px-2 flex gap-4"
              >
                <AccountBoxIcon fontSize="small" />
              </button>

              {showOption && <Options setShowOption={setShowOption} />}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
