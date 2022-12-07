import { musicAlarms } from "@/constants/music";
import { useTool } from "@/hooks/index";
import { MusicAlarm } from "@/interfaces/index";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RestoreIcon from "@mui/icons-material/Restore";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { Slider } from "@mui/material";
import { ChangeEvent, useEffect, useRef, useState } from "react";
const TimerAlert = () => {
  // Hook context
  const { isShowTimmer, setShowTimer } = useTool();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // State
  // Root timer
  const [timer, setTimer] = useState({
    minutes: 0,
    seconds: 0,
  });
  // Timer for updating UI
  const [counter, setCounter] = useState({
    minutes: 0,
    seconds: 0,
  });
  // Start working
  const [isStart, setIsStart] = useState(false);
  const [showListMusicAlarm, setShowMusicAlarm] = useState(false);
  const [musicAlarm, setMusicAlarm] = useState<MusicAlarm>(musicAlarms[0]);
  const [muted, setMuted] = useState(false);
  const [percentSound, setPercentSound] = useState(50);

  const handleChangeTimer = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTimer({
      ...timer,
      [name]: Number(value),
    });

    setCounter({
      ...counter,
      [name]: Number(value),
    });
  };

  const handleChangeSound = (e: Event, value: number | number[]) => {
    if (typeof value === "number") {
      setPercentSound(value);
      if (audioRef.current?.volume)
        audioRef.current.volume = (value / 100) as number;
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timer | null;

    // Working inclue play and pause
    // If play => enter below code
    // If pause => not enter and remain state
    if (isStart) {
      // When start timer and set time for clock
      if (counter.seconds !== 0 || counter.minutes !== 0) {
        intervalId = setInterval(() => {
          // Minutes change
          if (counter.seconds === 0) {
            // Doesn't finish time => decrease minutes
            if (counter.minutes !== 0) {
              setCounter({
                minutes: counter.minutes - 1,
                seconds: 60,
              });
            } else {
              // Finish time => reset timer
              setIsStart(false);

              // Reset root time
              setCounter({
                minutes: timer.minutes,
                seconds: timer.seconds,
              });
            }
          } else {
            setCounter({
              ...counter,
              seconds: counter.seconds - 1,
            });
          }
        }, 1000);
      }

      // When finish time
      if (counter.seconds === 0 && counter.minutes === 0 && isStart) {
        // Finish time => reset timer
        setIsStart(false);

        setCounter({
          minutes: timer.minutes,
          seconds: timer.seconds,
        });

        if (!muted) {
          audioRef.current?.play();
        }
      }
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [counter.seconds, counter.minutes, isStart]);

  return (
    <div
      className={`${
        isShowTimmer ? "opacity-100 z-50" : "opacity-0 -z-10"
      } absolute rounded-md bg-[#fcfcfc] top-[10%] transition-all ease-in-out duration-300 right-4`}
    >
      <div className="">
        {/* Title */}
        <div className="flex relative border-b-[1px] items-center py-3 px-3 gap-4">
          <h1 className="text-xl font-semibold text-[#4e4e4e]">Timer</h1>
          <div className="flex gap-1">
            <span className="text-base">⏰</span>
            <span className="text-base">⏰</span>
            <span className="text-base">⏰</span>
            <span className="text-base">⏰</span>
          </div>

          <button
            onClick={() => {
              setShowTimer(false);
            }}
            className="absolute right-2 top-[40%] translate-y-[-50%]"
          >
            <span className="text-5xl text-[#4e4e4e]">-</span>
          </button>
        </div>

        {/* Time count */}
        <div className="flex items-center justify-between px-3 py-2 w-[400px]">
          <h1 className="text-6xl font-semibold text-[#4e4e4e]">
            {counter.minutes.toString().length === 1
              ? `0${counter.minutes}`
              : counter.minutes}
            :
            {counter.seconds.toString().length === 1
              ? `0${counter.seconds}`
              : counter.seconds}
          </h1>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (timer.seconds === 0 && timer.minutes === 0) {
                  return alert(
                    "You don't set work time with no time and no minutes"
                  );
                }
                setIsStart(!isStart);
              }}
              className="py-2 px-8 border-[1px] border-[#4e4e4e] rounded-full hover:opacity-75"
            >
              <span>{isStart ? "Pause" : "Start"}</span>
            </button>

            <button
              onClick={() => {
                setIsStart(false);

                setCounter({
                  minutes: timer.minutes,
                  seconds: timer.seconds,
                });
              }}
              className="py-2 px-2"
            >
              <span>
                <RestoreIcon fontSize="small" />
              </span>
            </button>
          </div>
        </div>

        {/* Set Time */}
        <div className="px-3 py-2 w-[400px]">
          <h1 className="text-[17px] font-semibold text-[#4e4e4e]">
            Set time to work
          </h1>

          <div className="grid grid-cols-2 gap-2 w-full mt-4">
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-[#4e4e4e]">Minutes</p>
              <input
                disabled={isStart}
                min={0}
                value={timer.minutes}
                onChange={handleChangeTimer}
                name="minutes"
                type="number"
                className="border-[1px] rounded-md w-full py-1 px-1 outline-none focus:border-[1px] focus:border-gray-800"
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="font-semibold text-[#4e4e4e]">Seconds</p>
              <input
                disabled={isStart}
                min={0}
                value={timer.seconds}
                onChange={handleChangeTimer}
                name="seconds"
                type="number"
                className="border-[1px] rounded-md w-full py-1 px-1 outline-none focus:border-[1px] focus:border-gray-800"
              />
            </div>
          </div>
        </div>

        {/* Sound */}
        <div className="flex my-2 items-center gap-4 justify-between px-3">
          <h1 className="text-[17px] font-semibold text-[#4e4e4e]">
            Timer Sound
          </h1>

          <div
            onClick={() => {
              setShowMusicAlarm(!showListMusicAlarm);
            }}
            className={`flex-1 relative flex items-center justify-between cursor-pointer bg-[#f4f4f4] px-3 py-1`}
          >
            <div className="">
              <span>{musicAlarm.name}</span>
            </div>

            <div className="">
              <KeyboardArrowDownIcon />
            </div>

            {showListMusicAlarm && (
              <div
                className={`transition-all ease-in-out duration-300 bg-white absolute z-[20] left-0 right-0 bottom-0 translate-y-[100%] border rounded-b-md`}
              >
                <ul>
                  {musicAlarms.map((music, idx) => (
                    <li
                      key={idx}
                      onClick={() => {
                        setMusicAlarm(music);
                      }}
                      style={{
                        color:
                          musicAlarm.name === music.name ? "#f3b064" : "black",
                      }}
                      className="p-2 hover:text-[#f3b064] text-sm tracking-wider border-b-[1px]"
                    >
                      {music.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Sound Change */}
        <div className="px-3 flex my-2 mt-4 items-center justify-between gap-8">
          {!muted ? (
            <button
              onClick={() => {
                setMuted(true);
              }}
            >
              <VolumeUpIcon fontSize="small" sx={{ color: "#4e4e4e" }} />
            </button>
          ) : (
            <button
              onClick={() => {
                setMuted(false);
              }}
            >
              <VolumeMuteIcon fontSize="small" sx={{ color: "#4e4e4e" }} />
            </button>
          )}

          <Slider
            className="volumn-sound--alarm mt-1"
            aria-label="Volume"
            value={percentSound}
            onChange={handleChangeSound}
          />
        </div>

        {/* Button submit */}

        <div className="px-2 py-2">
          <button
            onClick={() => {
              setShowTimer(false);
            }}
            className="block w-full py-2 rounded-md hover:opacity-80 bg-[#f3a264] text-white font-semibold"
          >
            Save
          </button>
        </div>
      </div>

      <audio src={musicAlarm.src} muted={muted} ref={audioRef}></audio>
    </div>
  );
};

export default TimerAlert;
