import { db } from "@/configs/firebase";
import { useLocation, useUser } from "@/hooks/index";
import {
  BackgroundApp,
  Location,
  RequestApp,
  Room,
  User,
} from "@/interfaces/index";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { createContext, ReactNode, useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
interface RoomContextProps {
  children: ReactNode;
}

interface RoomContextData {
  loading: boolean;
  room: Room;

  enterRoom: (req: RequestApp) => Promise<void>;
  leaveRoom: () => Promise<void>;
  upadteBgRoom: (bg: BackgroundApp) => Promise<void>;
}

const roomContextDefaultData: RoomContextData = {
  loading: false,
  room: {
    id: "",
    name: "",
    uid: "",
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
    owner: null,
    guests: [],
  },

  enterRoom: (req: RequestApp) => Promise.resolve(void 0),
  leaveRoom: () => Promise.resolve(void 0),
  upadteBgRoom: (bg: BackgroundApp) => Promise.resolve(void 0),
};

export const RoomContext = createContext<RoomContextData>(
  roomContextDefaultData
);

const RoomContextProvider = ({ children }: RoomContextProps) => {
  // State
  const [loadingState, setLoadingState] = useState(
    roomContextDefaultData.loading
  );
  const [roomState, setRoomState] = useState(roomContextDefaultData.room);

  // Context
  const { user } = useUser();
  const { location } = useLocation();

  // Effect
  useEffect(() => {
    let unsubscribe: any = () => {};

    if (user?.uid) {
      // Check user is locating at another room
      // If true -> watch another room
      if (location) {
        const q = query(
          collection(db, "rooms"),
          where("id", "==", location.roomId)
        );
        unsubscribe = onSnapshot(q, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setRoomState(doc.data() as Room);
          });
        });
      } else {
        // If false -> watch own room
        const q = query(collection(db, "rooms"), where("uid", "==", user.uid));
        unsubscribe = onSnapshot(q, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setRoomState(doc.data() as Room);
          });
        });
      }
    }

    return () => unsubscribe();
  }, [user?.uid, location]);

  // Method
  const createLocation = async (data: Location) => {
    try {
      // Add location to save current locating of user
      const docRef = await addDoc(collection(db, "locations"), data);

      await updateDoc(doc(db, "locations", docRef.id), {
        id: docRef.id,
      });
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const leaveRoom = async () => {
    setLoadingState(true);
    try {
      // Delete locating user in another room
      if (location?.id) await deleteDoc(doc(db, "locations", location?.id));

      // Update guest user
      await updateDoc(doc(db, "rooms", location?.roomId as string), {
        guests: [
          ...(roomState.guests as User[]).filter(
            (r) => r.uid !== location?.uid
          ),
        ],
      });
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
    setLoadingState(false);
  };

  const enterRoom = async (req: RequestApp) => {
    setLoadingState(true);

    try {
      // Init data room
      let room: Room = {
        id: "",
        name: "",
        uid: "",
        owner: null,
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
      };

      // Check guest is in this room
      let isCheckedExistedGuest = false;

      // Get this room in firebase
      const q = query(collection(db, "rooms"), where("id", "==", req.roomId));
      const docSnap = await getDocs(q);

      // If room does not exist => show notification
      if (docSnap.docs.length === 0) toast.error("Room ID doesn't exits");
      else {
        // If room exist => handle
        docSnap.forEach((doc) => {
          room = {
            id: (doc.data() as Room).id,
            name: (doc.data() as Room).name,
            uid: (doc.data() as Room).uid,
            owner: (doc.data() as Room).owner,
            guests: (doc.data() as Room).guests,
            background: (doc.data() as Room).background,
          };
        });

        // Check guest is in this room
        isCheckedExistedGuest =
          room.guests.filter((guest) => guest.uid === req.uid).length > 0;

        if (!isCheckedExistedGuest) {
          // If user doesn't exist in room => add guests for another room
          // Update room document
          await updateDoc(doc(db, "rooms", req.roomId), {
            guests: [...(room.guests as User[]), user],
          });

          // Create location
          await createLocation({
            uid: user?.uid,
            roomId: room.id,
          });

          // Set room
          setRoomState({
            ...room,
            guests: [...(room.guests as User[]), user] as User[],
          });
        } else {
          setRoomState({
            ...room,
          });
        }
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
    setLoadingState(false);
  };

  const upadteBgRoom = async (bg: BackgroundApp) => {
    setLoadingState(true);

    try {
      await updateDoc(doc(db, "rooms", roomState.id), {
        background: bg,
      });
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
    setLoadingState(false);
  };

  // Data context
  const data: RoomContextData = {
    // Attribute
    room: roomState,
    loading: loadingState,

    // Method
    enterRoom,
    leaveRoom,
    upadteBgRoom,
  };

  return <RoomContext.Provider value={data}>{children}</RoomContext.Provider>;
};

export default RoomContextProvider;
