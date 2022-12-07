import { useEffect, useRef, useState } from "react";
// import Tippy from "@tippyjs/react";
import { useBackground, usePlaylist } from "@/hooks/index";
import { Slider } from "@mui/material";
import Tippy from "@tippyjs/react/headless"; // different import path!
import { noise } from "@/constants/music";

const Nodes = () => {
  const audioRainingRef = useRef<HTMLAudioElement | null>(null);
  const audioTrafficRef = useRef<HTMLAudioElement | null>(null);
  const audioKeyboardRef = useRef<HTMLAudioElement | null>(null);

  const {
    background,
    isRaining,
    theme,
    typeBg,
    isEnter,
    setDefaultBg,
    setRaining,
    setEnterBackground,
  } = useBackground();
  const { volumnOptionSongs, setVolumnOptionSongs, resetVolumnOptionSongs } =
    usePlaylist();

  const handleChangeVolumnSound = (
    type: "raining" | "traffic" | "keyboard",
    value: number
  ) => {
    // Change volumn
    setVolumnOptionSongs(type, value);
  };

  useEffect(() => {
    if (audioRainingRef.current) {
      if (volumnOptionSongs.raining > 0) {
        if (audioRainingRef.current.paused) audioRainingRef.current.play();
      }
      audioRainingRef.current.volume = volumnOptionSongs.raining / 100;
    }
    if (audioTrafficRef.current) {
      if (volumnOptionSongs.traffic > 0) {
        if (audioTrafficRef.current.paused) audioTrafficRef.current.play();
      }
      audioTrafficRef.current.volume = volumnOptionSongs.traffic / 100;
    }
    if (audioKeyboardRef.current) {
      if (volumnOptionSongs.keyboard > 0) {
        if (audioKeyboardRef.current.paused) audioKeyboardRef.current.play();
      }
      audioKeyboardRef.current.volume = volumnOptionSongs.keyboard / 100;
    }
  }, [
    volumnOptionSongs.raining,
    volumnOptionSongs.traffic,
    volumnOptionSongs.keyboard,
  ]);

  useEffect(() => {
    // When dirrent background had id = 1 && id = 2 => reset volumn to default
    if (background.id !== 1 && background.id !== 2) {
      resetVolumnOptionSongs();
    }
  }, [background.id]);

  // If Background !== 'exterior' or 'cafe' => doesn't show nodes
  return background.id === 1 || background.id === 2 ? (
    <div className="relative mt-8 h-[400px]">
      <div className="left-0 top-0 bottom-0 right-0 z-[-1]">
        <div className="">
          <Tippy
            render={(attrs) => (
              <div
                className={`py-1 px-4 bg-black bg-opacity-60 rounded-md`}
                {...attrs}
              >
                <p className="text-center mb-1 text-white font-semibold text-base">
                  {!isEnter ? "Enter" : "Logout"}
                </p>
              </div>
            )}
            content="Enter"
          >
            <button
              onClick={() => {
                setEnterBackground(!isEnter);
              }}
              className="absolute top-1/2 left-2/3 group cursor-pointer -translate-y-1/2"
            >
              <div
                style={{
                  borderColor: isEnter ? "#f3b064" : "",
                }}
                className="transition-all ease-in-out duration-300 w-10 h-10 p-1 border-4 rounded-full flex justify-center items-center border-white group-hover:border-[#f3b064]"
              >
                <div
                  style={{
                    backgroundColor: isEnter ? "#f3b064" : "",
                  }}
                  className="transition-all ease-in-out duration-300 w-full h-full bg-transparent group-hover:bg-[#f3b064] rounded-full"
                ></div>
              </div>
            </button>
          </Tippy>
        </div>

        <div>
          <Tippy
            interactive={isRaining}
            render={(attrs) => (
              <div
                className={`${
                  isRaining && "w-[180px]"
                }  py-1 px-4 bg-black bg-opacity-60 rounded-md`}
                {...attrs}
              >
                <p className="text-center mb-1 text-white font-semibold text-base">
                  City Rain
                </p>
                {isRaining && (
                  <Slider
                    className=""
                    aria-label="Volume"
                    value={volumnOptionSongs.raining}
                    onChange={(e, value) => {
                      handleChangeVolumnSound("raining", value as number);
                    }}
                  />
                )}
              </div>
            )}
          >
            <button
              onClick={() => {
                setRaining(!isRaining);
              }}
              className="absolute top-1/3 left-1/4 group cursor-pointer -translate-y-1/2"
            >
              <div
                style={{
                  borderColor: isRaining ? "#f3b064" : "",
                }}
                className={`transition-all ease-in-out duration-300 w-10 h-10 p-1 border-4 rounded-full flex justify-center items-center border-white group-hover:border-[#f3b064]`}
              >
                <div
                  style={{
                    backgroundColor: isRaining ? "#f3b064" : "",
                  }}
                  className={`transition-all ease-in-out duration-300 w-full h-full bg-transparent group-hover:bg-[#f3b064] rounded-full`}
                ></div>
              </div>
            </button>
          </Tippy>
        </div>

        <div>
          <Tippy
            interactive={true}
            render={(attrs) => (
              <div
                className={`w-[180px] py-1 px-4 bg-black bg-opacity-60 rounded-md`}
                {...attrs}
              >
                <p className="text-center mb-1 text-white font-semibold text-base">
                  Keyboard
                </p>

                <Slider
                  className=""
                  aria-label="Volume"
                  value={volumnOptionSongs.keyboard}
                  onChange={(e, value) => {
                    handleChangeVolumnSound("keyboard", value as number);
                  }}
                />
              </div>
            )}
          >
            <button className="absolute top-[35%] left-[50%] group cursor-pointer -translate-y-1/2">
              <div
                style={{
                  borderColor: volumnOptionSongs.keyboard > 0 ? "#f3b064" : "",
                }}
                className="transition-all ease-in-out duration-300 w-10 h-10 p-1 border-4 rounded-full flex justify-center items-center border-white group-hover:border-[#f3b064]"
              >
                <div
                  style={{
                    backgroundColor:
                      volumnOptionSongs.keyboard > 0 ? "#f3b064" : "",
                  }}
                  className="transition-all ease-in-out duration-300 w-full h-full bg-transparent group-hover:bg-[#f3b064] rounded-full"
                ></div>
              </div>
            </button>
          </Tippy>
        </div>

        <div>
          <Tippy
            interactive={true}
            render={(attrs) => (
              <div
                className={`w-[180px] py-1 px-4 bg-black bg-opacity-60 rounded-md`}
                {...attrs}
              >
                <p className="text-center mb-1 text-white font-semibold text-base">
                  City Traffic
                </p>

                <Slider
                  className=""
                  aria-label="Volume"
                  value={volumnOptionSongs.traffic}
                  onChange={(e, value) => {
                    handleChangeVolumnSound("traffic", value as number);
                  }}
                />
              </div>
            )}
          >
            <button className="absolute top-3/4 left-[400px] group cursor-pointer -translate-y-1/2">
              <div
                style={{
                  borderColor: volumnOptionSongs.traffic > 0 ? "#f3b064" : "",
                }}
                className="transition-all ease-in-out duration-300 w-10 h-10 p-1 border-4 rounded-full flex justify-center items-center border-white group-hover:border-[#f3b064]"
              >
                <div
                  style={{
                    backgroundColor:
                      volumnOptionSongs.traffic > 0 ? "#f3b064" : "",
                  }}
                  className="transition-all ease-in-out duration-300 w-full h-full bg-transparent group-hover:bg-[#f3b064] rounded-full"
                ></div>
              </div>
            </button>
          </Tippy>
        </div>

        <div className="">
          <Tippy
            render={(attrs) => (
              <div
                className={`py-1 px-4 bg-black bg-opacity-60 rounded-md`}
                {...attrs}
              >
                <p className="text-center mb-1 text-white font-semibold text-base">
                  City Nature
                </p>
              </div>
            )}
          >
            <button
              onClick={() => {
                setDefaultBg();
              }}
              className="absolute top-28 right-48 group cursor-pointer -translate-y-1/2"
            >
              <div
                style={{
                  borderColor:
                    !isRaining &&
                    !isEnter &&
                    theme === "light" &&
                    typeBg === "exterior"
                      ? "#f3b064"
                      : "",
                }}
                className={`transition-all ease-in-out duration-300 w-10 h-10 p-1 border-4 rounded-full flex justify-center items-center border-white group-hover:border-[#f3b064]`}
              >
                <div
                  style={{
                    backgroundColor:
                      !isRaining &&
                      !isEnter &&
                      theme === "light" &&
                      typeBg === "exterior"
                        ? "#f3b064"
                        : "",
                  }}
                  className="transition-all ease-in-out duration-300 w-full h-full bg-transparent group-hover:bg-[#f3b064] rounded-full"
                ></div>
              </div>
            </button>
          </Tippy>
        </div>
      </div>
      <audio src={noise[1].src} loop ref={audioRainingRef}></audio>
      <audio src={noise[2].src} loop ref={audioTrafficRef}></audio>
      <audio src={noise[0].src} loop ref={audioKeyboardRef}></audio>
    </div>
  ) : null;
};

export default Nodes;
