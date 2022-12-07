import { createContext, ReactNode } from "react";
import { Song } from "@/interfaces/index";
import { useState } from "react";
import { playlists } from "@/constants/music";
interface PlaylistContext {
  children: ReactNode;
}

interface PlaylistContextData {
  typeSong: "chill" | "jazzy" | "sleep";
  activeIndex: number;
  song: Song;
  volumnSong: number;
  volumnOptionSongs: {
    raining: number;
    traffic: number;
    keyboard: number;
  };

  setTypeSong: (t: "chill" | "jazzy" | "sleep") => void;
  setVolumnSong: (v: number) => void;
  setVolumnOptionSongs: (
    type: "raining" | "traffic" | "keyboard",
    value: number
  ) => void;
  resetVolumnOptionSongs: () => void;
  nextSong: () => void;
  prevSong: () => void;
}

const playlistContextDefaultData: PlaylistContextData = {
  typeSong: "chill",
  activeIndex: 0,
  song: {
    id: 1,
    name: "Formant - Regret",
    src: "https://res.cloudinary.com/dehcucoor/video/upload/v1667444981/Study-chill/Audio/song/chill/Formant_-_Regret_oidbsf.mp3",
  },
  volumnSong: 50,
  volumnOptionSongs: {
    raining: 0,
    traffic: 0,
    keyboard: 0,
  },

  setTypeSong: (t: "chill" | "jazzy" | "sleep") => {},
  setVolumnSong: (v: number) => {},
  setVolumnOptionSongs: (
    type: "raining" | "traffic" | "keyboard",
    value: number
  ) => {},
  resetVolumnOptionSongs: () => {},
  nextSong: () => {},
  prevSong: () => {},
};

export const PlaylistContext = createContext<PlaylistContextData>(
  playlistContextDefaultData
);

const PlaylistContextProvider = ({ children }: PlaylistContext) => {
  // State

  const [songState, setSongState] = useState(playlistContextDefaultData.song);
  const [typeSongState, setTypeSongState] = useState(
    playlistContextDefaultData.typeSong
  );
  const [activeIndexState, setActiveIndexState] = useState(
    playlistContextDefaultData.activeIndex
  );
  const [volumnSongState, setVolumnSongState] = useState(
    playlistContextDefaultData.volumnSong
  );
  const [volumnOptionState, setVolumnOptionState] = useState(
    playlistContextDefaultData.volumnOptionSongs
  );

  const setTypeSong = (type: "chill" | "jazzy" | "sleep") => {
    const currentPlaylist = playlists[type];
    const song: Song = currentPlaylist[0];

    // Set active index = 0
    setActiveIndexState(0);

    // Set first song
    setSongState(song);

    // Set type
    setTypeSongState(type);
  };

  const setVolumnSong = (v: number) => {
    setVolumnSongState(v);
  };

  const setVolumnOptionSongs = (
    type: "raining" | "traffic" | "keyboard",
    value: number
  ) => {
    setVolumnOptionState({
      ...volumnOptionState,
      [type]: value,
    });
  };

  const resetVolumnOptionSongs = () => {
    setVolumnOptionState({
      keyboard: 0,
      raining: 0,
      traffic: 0,
    });
  };

  const nextSong = () => {
    // Get current playlist and current index
    const currentPlaylist = playlists[typeSongState];
    let currentIndex = activeIndexState;

    // Reset first Song when finish playlist
    if (currentIndex >= currentPlaylist.length - 1) {
      currentIndex = 0;
    } else {
      currentIndex += 1;
    }
    setActiveIndexState(currentIndex);

    // Set data
    const song: Song = currentPlaylist[currentIndex];
    setSongState(song);
  };

  const prevSong = () => {
    // Get current playlist and current index
    const currentPlaylist = playlists[typeSongState];
    let currentIndex = activeIndexState;

    // Reset first Song when finish playlist
    if (currentIndex === 0) {
      currentIndex = currentPlaylist.length - 1;
    } else {
      currentIndex -= 1;
    }
    setActiveIndexState(currentIndex);

    // Set data
    const song: Song = currentPlaylist[currentIndex];
    setSongState(song);
  };

  // Data context
  const data: PlaylistContextData = {
    song: songState,
    typeSong: typeSongState,
    activeIndex: activeIndexState,
    volumnSong: volumnSongState,
    volumnOptionSongs: volumnOptionState,

    setTypeSong,
    setVolumnSong,
    setVolumnOptionSongs,
    resetVolumnOptionSongs,
    nextSong,
    prevSong,
  };

  return (
    <PlaylistContext.Provider value={data}>{children}</PlaylistContext.Provider>
  );
};

export default PlaylistContextProvider;
