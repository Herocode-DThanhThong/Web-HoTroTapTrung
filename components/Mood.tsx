import { useBackground, usePlaylist, useRoom, useUser } from "@/hooks/index";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import CloudIcon from "@mui/icons-material/Cloud";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import { Stack } from "@mui/material";
import Slider from "@mui/material/Slider";
const Mood = () => {
  const {
    typeSong,
    volumnSong,
    volumnOptionSongs,
    setTypeSong,
    setVolumnSong,
    setVolumnOptionSongs,
  } = usePlaylist();
  const { user } = useUser();
  const { room } = useRoom();
  const { background } = useBackground();

  const handleChangeSound = (e: Event, value: number | number[]) => {
    if (typeof value === "number") {
      setVolumnSong(value);
    }
  };

  const handleChangeVolumnSound = (
    type: "raining" | "traffic" | "keyboard",
    value: number
  ) => {
    // Change volumn
    setVolumnOptionSongs(type, value);
  };

  return (
    <div className="absolute px-8 w-[350px] h-[400px] -top-1/2 bg-opacity-90  rounded-3xl -left-2 bottom-0 -translate-x-full bg-black p-4">
      <div>
        {/* Mood */}
        <h1 className="font-bold text-white text-2xl">Mood</h1>
        <div className="grid mt-4 grid-cols-3 gap-4">
          <div
            onClick={() => {
              if (typeSong !== "sleep") {
                setTypeSong("sleep");
              }
            }}
            style={{
              backgroundColor: typeSong === "sleep" ? "#f3b064" : "#1f2937",
            }}
            className={`flex flex-col py-2 rounded-lg`}
          >
            <button className="rounded-md p-3 py-2 flex justify-center items-center">
              <BedtimeIcon
                sx={{
                  color: typeSong === "sleep" ? "white" : "#f3b064",
                  fontSize: "2rem",
                }}
              />
            </button>
            <p className="text-sm text-center font-semibold tracking-wider">
              Sleepy
            </p>
          </div>
          <div
            onClick={() => {
              if (typeSong !== "jazzy") {
                setTypeSong("jazzy");
              }
            }}
            style={{
              backgroundColor: typeSong === "jazzy" ? "#f3b064" : "#1f2937",
            }}
            className="flex flex-col py-2 rounded-lg bg-gray-800"
          >
            <button className="rounded-md p-3 py-2 flex justify-center items-center">
              <CloudIcon
                sx={{
                  color: typeSong === "jazzy" ? "white" : "#f3b064",
                  fontSize: "2rem",
                }}
              />
            </button>
            <p className="text-sm text-center font-semibold tracking-wider">
              Relax
            </p>
          </div>
          <div
            onClick={() => {
              if (typeSong !== "chill") {
                setTypeSong("chill");
              }
            }}
            style={{
              backgroundColor: typeSong === "chill" ? "#f3b064" : "#1f2937",
            }}
            className="flex flex-col py-2 rounded-lg bg-gray-800"
          >
            <button className="ounded-md p-3 py-2 flex justify-center items-center">
              <FreeBreakfastIcon
                sx={{
                  color: typeSong === "chill" ? "white" : "#f3b064",
                  fontSize: "2rem",
                }}
              />
            </button>
            <p className="text-sm text-center font-semibold tracking-wider">
              Chill
            </p>
          </div>
        </div>

        {/* Slider volumn */}
        <Stack spacing={2} direction="row" sx={{ my: 4 }} alignItems="center">
          <VolumeDown
            sx={{
              color: "#f3b064",
            }}
          />
          <Slider
            aria-label="Volume"
            value={volumnSong}
            onChange={handleChangeSound}
          />
          <VolumeUp
            sx={{
              color: "#f3b064",
            }}
          />
        </Stack>

        {/* Background noises */}
        <h1 className="font-bold text-white text-2xl">Background noises</h1>
        <div className="mt-2">
          <div className="flex justify-between my-2 items-center">
            <span className="capitalize basis-2/3 text-sm text-gray-300 tracking-wider">
              City traffic
            </span>
            <Slider
              disabled={
                (background.id !== 1 && background.id !== 2) ||
                user?.uid !== room.uid
              }
              className="volume-noise--traffic"
              aria-label="Volume"
              value={volumnOptionSongs.traffic}
              onChange={(e, value) => {
                handleChangeVolumnSound("traffic", value as number);
              }}
            />
          </div>
          <div className="flex justify-between my-2 items-center">
            <span className="capitalize basis-2/3 text-sm text-gray-300 tracking-wider">
              City rain
            </span>
            <Slider
              disabled={
                (background.id !== 1 && background.id !== 2) ||
                user?.uid !== room.uid
              }
              className="volume-noise--rain"
              aria-label="Volume"
              value={volumnOptionSongs.raining}
              onChange={(e, value) => {
                handleChangeVolumnSound("raining", value as number);
              }}
            />
          </div>
          <div className="flex justify-between my-2 items-center">
            <span className="capitalize basis-2/3 text-sm text-gray-300 tracking-wider">
              Keyboard
            </span>
            <Slider
              disabled={
                (background.id !== 1 && background.id !== 2) ||
                user?.uid !== room.uid
              }
              className="volume-noise--keyboard"
              aria-label="Volume"
              value={volumnOptionSongs.keyboard}
              onChange={(e, value) => {
                handleChangeVolumnSound("keyboard", value as number);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mood;
