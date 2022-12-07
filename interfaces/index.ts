export interface Background {
  id: number;
  name: string;
  urlNoRaining: string;
  urlRaining: string;
  alias: string;
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
}

export interface Theme {
  light: Background;
  dark: Background;
}

export interface Backgrounds {
  light: {
    cafe: Background;
    exterior: Background;
    kyoto: Background;
    winter: Background;
  };
  dark: {
    cafe: Background;
    exterior: Background;
    kyoto: Background;
    winter: Background;
  };
}

export interface Error {
  message: string;
}

export interface BackgroundApp extends Background {
  theme: "light" | "dark";
  typeBg: "exterior" | "cafe" | "kyoto" | "winter";
  isRaining: boolean;
  isEnter: boolean;
}

export interface Room {
  id: string;
  name: string;
  uid: string;
  owner: User | null;
  guests: User[];
  background: BackgroundApp;
}

export interface RequestApp {
  uid?: string;
  roomId: string;
  userRequest: User | null;
}

export interface Location {
  id?: string;
  uid?: string;
  roomId?: string;
}

export interface Message {
  id: string;
  room: string;
  sender: Partial<User>;
  content: string;
}

export interface MusicAlarm {
  id: number;
  name: string;
  src: string;
}

export interface Music {
  id: number;
  name: string;
  src: string;
}

export interface Song {
  id: number;
  name: string;
  src: string;
}

export interface PlayList {
  chill: Song[];
  jazzy: Song[];
  sleep: Song[];
}
