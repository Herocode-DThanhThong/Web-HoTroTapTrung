import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { useBackground, usePlaylist } from "@/hooks/index";
import { useRef, useState } from "react";
import PauseCircleOutlineOutlinedIcon from "@mui/icons-material/PauseCircleOutlineOutlined";
import { useEffect } from "react";
const Player = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { song, typeSong, volumnSong, nextSong, prevSong } = usePlaylist();

  // State
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlaySong = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  const handleNextSong = () => {
    nextSong();

    setTimeout(() => {
      // Set playing
      setIsPlaying(true);

      // Audio play
      audioRef.current?.play();
    }, 1000);
  };

  const handlePrevSong = () => {
    prevSong();

    setTimeout(() => {
      // Set playing
      setIsPlaying(true);

      // Audio play
      audioRef.current?.play();
    }, 1000);
  };

  useEffect(() => {
    // Listen when audio ended
    const intervalId = setInterval(() => {
      if (audioRef.current?.ended) {
        handleNextSong();
      }
    }, 500);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setIsPlaying(false);
  }, [typeSong]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volumnSong / 100;
  }, [volumnSong]);

  return (
    <div className="fixed left-0 right-0 bottom-0 ">
      {/* Song  */}
      <div className="flex justify-center py-4">
        <div className="">
          {/* fixed bottom-8 left-1/2 -translate-x-1/2 */}
          <div className="">
            <h1 className="capitalize my-4 text-center text-white font-bold text-xl tracking-wider">
              {song.name}
            </h1>
          </div>
          {/* fixed bottom-16 left-1/2 -translate-x-1/2 */}
          <div className="flex justify-center">
            {/* Controls */}
            <div className="bg-black py-2 bg-opacity-90 rounded-md px-6 text-white">
              <button
                onClick={() => {
                  handlePrevSong();
                }}
                className="border-r-[1px] pr-4 hover:opacity-60 cursor-pointer"
              >
                <SkipPreviousIcon />
              </button>
              <button
                onClick={() => {
                  handlePlaySong();
                }}
                className="mx-4 hover:opacity-60 cursor-pointer"
              >
                {isPlaying ? (
                  <PauseCircleOutlineOutlinedIcon />
                ) : (
                  <PlayCircleOutlineIcon />
                )}
              </button>
              <button
                onClick={() => {
                  handleNextSong();
                }}
                className="border-l-[1px] pl-4 hover:opacity-60 cursor-pointer"
              >
                <SkipNextIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
      <audio src={song.src} ref={audioRef} />
    </div>
  );
};

export default Player;
