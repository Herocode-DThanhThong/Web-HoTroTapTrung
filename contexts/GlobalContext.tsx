import { createContext, ReactNode, useState } from "react";

interface GlobalContextProps {
  children: ReactNode;
}

interface GlobalContextData {
  showLogin: boolean;
  showRegister: boolean;
  showInfo: boolean;

  toggleShowLogin: (s: boolean) => void;
  toggleShowRegister: (s: boolean) => void;
  toggleShowInfo: (s: boolean) => void;
}

const globalContextDefaultData: GlobalContextData = {
  showLogin: false,
  showRegister: false,
  showInfo: false,

  toggleShowLogin: (s: boolean) => {},
  toggleShowRegister: (s: boolean) => {},
  toggleShowInfo: (s: boolean) => {},
};

export const GlobalContext = createContext<GlobalContextData>(
  globalContextDefaultData
);

const GlobalContextProvider = ({ children }: GlobalContextProps) => {
  // State
  const [showLoginState, setShowLoginState] = useState(
    globalContextDefaultData.showLogin
  );
  const [showRegisterState, setShowRegisterState] = useState(
    globalContextDefaultData.showRegister
  );

  const [showInfoState, setShowInfoState] = useState(
    globalContextDefaultData.showInfo
  );

  // Data context
  const data: GlobalContextData = {
    // Attribute
    showInfo: showInfoState,
    showLogin: showLoginState,
    showRegister: showRegisterState,

    // Method
    toggleShowLogin: (s: boolean) => {
      // Hide other modal
      setShowRegisterState(false);

      // Toggle modal login
      setShowLoginState(s);
    },
    toggleShowRegister: (s: boolean) => {
      // Hide other modal
      setShowLoginState(false);

      // Toggle modal register
      setShowRegisterState(s);
    },
    toggleShowInfo: (s: boolean) => {
      // Toggle modal infomation
      setShowInfoState(s);
    },
  };

  return (
    <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
