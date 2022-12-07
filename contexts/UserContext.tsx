import { auth, db, provider } from "@/configs/firebase";
import { useGlobal } from "@/hooks/index";
import { Room, User } from "@/interfaces/index";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface UserContextProps {
  children: ReactNode;
}

interface UserContextData {
  loading: boolean;
  isLogin: boolean;
  user: User | null;

  signup: (displayName: string, email: string, password: string) => void;
  loginWithEmailPassword: (email: string, password: string) => void;
  loginWithGoogle: () => void;
  logout: () => Promise<void>;
}

const userContextDefaultData: UserContextData = {
  loading: false,
  isLogin: false,
  user: null,

  signup: (displayName: string, email: string, password: string) => {},
  loginWithEmailPassword: (email: string, password: string) => {},
  loginWithGoogle: () => {},
  logout: () => Promise.resolve(void 0),
};

export const UserContext = createContext<UserContextData>(
  userContextDefaultData
);

const UserContextProvider = ({ children }: UserContextProps) => {
  // State
  const [loadingState, setLoadingState] = useState(
    userContextDefaultData.loading
  );
  const [isLoginState, setIsLoginState] = useState(
    userContextDefaultData.isLogin
  );
  const [userState, setUserState] = useState(userContextDefaultData.user);

  // Context
  const { toggleShowLogin, toggleShowRegister } = useGlobal();

  // Effect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Set info user
        setUserState({
          uid: user.uid,
          email: user.email as string,
          displayName: user.displayName as string,
        });

        // logged
        setIsLoginState(true);
      } else {
        // Set info user
        setUserState(null);

        // logged
        setIsLoginState(false);
      }
      setLoadingState(false);
    });

    return () => unsubscribe();
  }, []);

  // Method
  const createRoom = async (room: Room) => {
    try {
      const docRef = await addDoc(collection(db, "rooms"), room);

      await updateDoc(doc(db, "rooms", docRef.id), {
        id: docRef.id,
      });
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const checkRoomExist = async (uid: string) => {
    let isExist = false;
    try {
      const q = query(collection(db, "rooms"), where("uid", "==", uid));
      const docSnap = await getDocs(q);

      docSnap.forEach((doc) => {
        if (doc.id) isExist = true;
      });
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
    return isExist;
  };

  const signup = async (
    displayName: string,
    email: string,
    password: string
  ) => {
    try {
      setLoadingState(true);

      // Create account
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Update displayName
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName,
        });
      }

      // Create room
      await createRoom({
        id: "",
        name: res.user.displayName as string,
        uid: res.user.uid,
        owner: {
          uid: res.user.uid,
          email: res.user.email as string,
          displayName: res.user.displayName as string,
        },
        guests: [],
        background: {
          id: 1,
          name: "Exterior Day",
          alias: "exteriorDay",
          urlNoRaining:
            "https://res.cloudinary.com/dehcucoor/video/upload/v1667229670/Study-chill/Video-background/ExteriorDay_c2hp5f.mp4",
          urlRaining:
            "https://res.cloudinary.com/dehcucoor/video/upload/v1667229674/Study-chill/Video-background/ExteriorRainyDay_cubm5a.mp4",
          isRaining: false,
          typeBg: "exterior",
          theme: "light",
          isEnter: false,
        },
      });

      // Sign out to Sign in because when sign up -> firebase auto sign in but update displayName imediately -> solution is logout to login
      await signOut(auth);

      toast("Sign up successfully");

      toggleShowRegister(false);

      // Show login modal
      toggleShowLogin(true);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }

    setLoadingState(false);
  };

  const loginWithEmailPassword = async (email: string, password: string) => {
    setLoadingState(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      toast("Login successfully");

      toggleShowLogin(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
    setLoadingState(false);
  };

  const loginWithGoogle = async () => {
    try {
      setLoadingState(true);
      const res = await signInWithPopup(auth, provider);

      const user: User = {
        uid: res.user.uid,
        email: res.user.email as string,
        displayName: res.user.displayName as string,
      };

      const isCheckExited = await checkRoomExist(res.user.uid);

      if (!isCheckExited) {
        await createRoom({
          id: "",
          uid: res.user.uid,
          name: res.user.displayName as string,
          owner: {
            uid: res.user.uid,
            email: res.user.email as string,
            displayName: res.user.displayName as string,
          },
          guests: [],
          background: {
            id: 1,
            name: "Exterior Day",
            alias: "exteriorDay",
            urlNoRaining:
              "https://res.cloudinary.com/dehcucoor/video/upload/v1667229670/Study-chill/Video-background/ExteriorDay_c2hp5f.mp4",
            urlRaining:
              "https://res.cloudinary.com/dehcucoor/video/upload/v1667229674/Study-chill/Video-background/ExteriorRainyDay_cubm5a.mp4",
            isRaining: false,
            typeBg: "exterior",
            theme: "light",
            isEnter: false,
          },
        });
      }

      setUserState(user);

      // Hide form login
      toggleShowLogin(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
    setLoadingState(false);
  };

  const logout = async () => {
    setLoadingState(true);

    setUserState(null);

    await signOut(auth);

    setLoadingState(false);
  };

  // Data context
  const data: UserContextData = {
    // Attribute
    loading: loadingState,
    isLogin: isLoginState,
    user: userState,

    // Method
    signup,
    loginWithEmailPassword,
    loginWithGoogle,
    logout,
  };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
