import backgrounds from "@/constants/background";
import { useRoom } from "@/hooks/index";
import { Background, BackgroundApp } from "@/interfaces/index";
import { createContext, ReactNode, useEffect, useState } from "react";

interface BackgroundContextProps {
  children: ReactNode;
}

interface BackgroundContextData {
  background: Background;

  theme: "light" | "dark";
  typeBg: "exterior" | "cafe" | "kyoto" | "winter";
  isRaining: boolean;
  isEnter: boolean;

  toggleTheme: (t: "light" | "dark") => void;
  handleChangeSetChange: (
    typeBg: "exterior" | "cafe" | "kyoto" | "winter"
  ) => void;
  setRaining: (t: boolean) => void;
  setEnterBackground: (e: boolean) => void;
  setDefaultBg: () => void;
}

const backgroundContextDefaultData: BackgroundContextData = {
  // Background
  background: {
    id: 1,
    name: "Exterior Day",
    alias: "exteriorDay",
    urlNoRaining:
      "https://res.cloudinary.com/dehcucoor/video/upload/v1667229670/Study-chill/Video-background/ExteriorDay_c2hp5f.mp4",
    urlRaining:
      "https://res.cloudinary.com/dehcucoor/video/upload/v1667229674/Study-chill/Video-background/ExteriorRainyDay_cubm5a.mp4",
  },

  // Options for background
  theme: "light", // "light" | "dark"
  typeBg: "exterior", // "exterior" | "cafe" | "kyoto" | "winter"
  isRaining: false,
  isEnter: false,

  toggleTheme: (t: "light" | "dark") => {},
  setRaining: (t: boolean) => {},
  handleChangeSetChange: (
    typeBg: "exterior" | "cafe" | "kyoto" | "winter"
  ) => {},
  setEnterBackground: (e: boolean) => {},
  setDefaultBg: () => {},
};

export const BackgroundContext = createContext<BackgroundContextData>(
  backgroundContextDefaultData
);

const BackgroundProvider = ({ children }: BackgroundContextProps) => {
  // Hooks
  const { upadteBgRoom, room } = useRoom();

  // State
  const [bgState, setBgState] = useState(
    backgroundContextDefaultData.background
  );
  const [typeBgState, setTypeBgState] = useState(
    backgroundContextDefaultData.typeBg
  );
  const [themeState, setThemeState] = useState(
    backgroundContextDefaultData.theme
  );
  const [isRainingState, setIsRanningState] = useState(
    backgroundContextDefaultData.isRaining
  );
  const [isEnterState, setIsEnterState] = useState(
    backgroundContextDefaultData.isEnter
  );

  useEffect(() => {
    if (room.id) {
      setTypeBgState(room.background.typeBg);
      setIsEnterState(room.background.isEnter);
      setBgState(room.background);
      setThemeState(room.background.theme);
      setIsRanningState(room.background.isRaining);
    }
  }, [room.id]);

  // Method
  const resetOptions = () => {
    setThemeState("light");
    setTypeBgState("exterior");
    setIsRanningState(false);
    setIsEnterState(false);
  };

  const updateBackgroundToDatabase = (bgUpdate: BackgroundApp) => {
    upadteBgRoom(bgUpdate);
  };

  const handleChangeSetChange = (
    typeBg: "exterior" | "cafe" | "kyoto" | "winter"
  ) => {
    // Refresh all options because some background doesn't exist option
    resetOptions();

    // Set Type background browser
    setTypeBgState(typeBg);

    // Set Background and update to firebase
    setBackground(themeState, typeBg, false, false);
  };

  const setBackground = (
    theme: "light" | "dark",
    typeBg: "exterior" | "cafe" | "kyoto" | "winter",
    isRaining: boolean,
    isEnter: boolean
  ) => {
    let bg: Background;
    if (theme === "light") {
      bg = backgrounds.light[typeBg];
    } else {
      bg = backgrounds.dark[typeBg];
    }
    // Upadte current background
    setBgState(bg);
    // Update to database
    updateBackgroundToDatabase({
      // Background
      ...bg,
      // Options
      isEnter,
      isRaining,
      typeBg,
      theme,
    });
  };

  const setRaining = (r: boolean) => {
    // Set raining
    setIsRanningState(r);

    // Update bg
    setBackground(themeState, typeBgState, r, isEnterState);
  };

  const toggleTheme = (theme: "light" | "dark") => {
    // Set theme
    setThemeState(theme);

    // Update bg
    setBackground(theme, typeBgState, isRainingState, isEnterState);
  };

  const setEnterBackground = (isEnter: boolean) => {
    // Set Enter
    setIsEnterState(isEnter);

    // Set TypeBg
    setTypeBgState(isEnter ? "cafe" : "exterior");

    // Update to database
    if (isEnter) {
      setBackground(themeState, "cafe", isRainingState, isEnter);
    } else {
      setBackground(themeState, "exterior", isRainingState, isEnter);
    }
  };

  const setDefaultBg = () => {
    // Reset all to default
    resetOptions();

    // Update to database
    const bgDeafault: BackgroundApp = {
      id: 1,
      name: "Exterior Day",
      alias: "exteriorDay",
      urlNoRaining:
        "https://res.cloudinary.com/dehcucoor/video/upload/v1667229670/Study-chill/Video-background/ExteriorDay_c2hp5f.mp4",
      urlRaining:
        "https://res.cloudinary.com/dehcucoor/video/upload/v1667229674/Study-chill/Video-background/ExteriorRainyDay_cubm5a.mp4",
      isRaining: false,
      typeBg: "exterior",
      isEnter: false,
      theme: "light",
    };

    updateBackgroundToDatabase(bgDeafault);

    setBgState({
      id: 1,
      name: "Exterior Day",
      alias: "exteriorDay",
      urlNoRaining:
        "https://res.cloudinary.com/dehcucoor/video/upload/v1667229670/Study-chill/Video-background/ExteriorDay_c2hp5f.mp4",
      urlRaining:
        "https://res.cloudinary.com/dehcucoor/video/upload/v1667229674/Study-chill/Video-background/ExteriorRainyDay_cubm5a.mp4",
    });
  };

  // Data Context
  const data: BackgroundContextData = {
    // Attribute
    background: bgState,
    isRaining: isRainingState,
    typeBg: typeBgState,
    theme: themeState,
    isEnter: isEnterState,

    setRaining,
    toggleTheme,
    setEnterBackground,
    setDefaultBg,
    handleChangeSetChange,
  };

  return (
    <BackgroundContext.Provider value={data}>
      {children}
    </BackgroundContext.Provider>
  );
};

export default BackgroundProvider;
