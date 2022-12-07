import { createContext, ReactNode, useState } from "react";

interface ToolContext {
  children: ReactNode;
}

interface ToolContextData {
  isStartSession: boolean;
  isShowTimmer: boolean;

  startSession: () => void;
  setShowTimer: (s: boolean) => void;
}

const toolContextDefaultData: ToolContextData = {
  isStartSession: false,
  isShowTimmer: false,

  startSession: () => {},
  setShowTimer: (s: boolean) => {},
};

export const ToolContext = createContext<ToolContextData>(
  toolContextDefaultData
);

const ToolContextProvider = ({ children }: ToolContext) => {
  const [isStartSessionState, setIsStartSessionState] = useState(
    toolContextDefaultData.isStartSession
  );
  const [isShowTimerState, setIsShowTimerState] = useState(
    toolContextDefaultData.isShowTimmer
  );

  const startSession = () => {
    setIsStartSessionState(!isStartSessionState);
  };

  const setShowTimer = (s: boolean) => {
    setIsShowTimerState(s);
  };

  // Data context
  const data: ToolContextData = {
    isStartSession: isStartSessionState,
    isShowTimmer: isShowTimerState,

    startSession,
    setShowTimer,
  };

  return <ToolContext.Provider value={data}>{children}</ToolContext.Provider>;
};

export default ToolContextProvider;
