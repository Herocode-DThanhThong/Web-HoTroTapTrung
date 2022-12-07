import { ChatContext } from "@/contexts/ChatContext";
import { LocationContext } from "@/contexts/LocationContext";
import { UserContext } from "@/contexts/UserContext";
import { BackgroundContext } from "@/contexts/BackgroundContext";
import { GlobalContext } from "@/contexts/GlobalContext";
import { RoomContext } from "@/contexts/RoomContex";
import { useContext } from "react";
import { ToolContext } from "@/contexts/ToolContext";
import { PlaylistContext } from "@/contexts/PlaylistContext";

export const useUser = () => {
  return useContext(UserContext);
};

export const useLocation = () => {
  return useContext(LocationContext);
};

export const useRoom = () => {
  return useContext(RoomContext);
};

export const usePlaylist = () => {
  return useContext(PlaylistContext);
};

export const useTool = () => {
  return useContext(ToolContext);
};

export const useBackground = () => {
  return useContext(BackgroundContext);
};

export const useChat = () => {
  return useContext(ChatContext);
};

export const useGlobal = () => {
  return useContext(GlobalContext);
};
