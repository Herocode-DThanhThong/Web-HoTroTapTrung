import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "../styles/globals.css";

// import style font mui
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// import style tippy
import BackgroundProvider from "@/contexts/BackgroundContext";
import GlobalContextProvider from "@/contexts/GlobalContext";
import UserContextProvider from "@/contexts/UserContext";
import "tippy.js/dist/tippy.css"; // opti

// import style react toastsify
import LocationContextProvider from "@/contexts/LocationContext";
import RoomContextProvider from "@/contexts/RoomContex";
import "react-toastify/dist/ReactToastify.css";
import ChatContextProvider from "@/contexts/ChatContext";
import ToolContextProvider from "@/contexts/ToolContext";
import PlaylistContextProvider from "@/contexts/PlaylistContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalContextProvider>
        <UserContextProvider>
          <LocationContextProvider>
            <RoomContextProvider>
              <ChatContextProvider>
                <BackgroundProvider>
                  <ToolContextProvider>
                    <PlaylistContextProvider>
                      <Component {...pageProps} />
                      <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                      />
                    </PlaylistContextProvider>
                  </ToolContextProvider>
                  <ToastContainer />
                </BackgroundProvider>
              </ChatContextProvider>
            </RoomContextProvider>
          </LocationContextProvider>
        </UserContextProvider>
      </GlobalContextProvider>
    </>
  );
}

export default MyApp;
