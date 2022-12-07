import { createContext, ReactNode, useEffect, useState } from "react";
import { useUser } from "@/hooks/index";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/configs/firebase";
import { Location } from "@/interfaces/index";

interface LocationContextProps {
  children: ReactNode;
}

interface LocationContextData {
  location: Location | null;
}

const locationContextDefaultData: LocationContextData = {
  location: null,
};

export const LocationContext = createContext<LocationContextData>(
  locationContextDefaultData
);

const LocationContextProvider = ({ children }: LocationContextProps) => {
  // State
  const [locationState, setLocationState] = useState(
    locationContextDefaultData.location
  );

  // Context
  const { user } = useUser();

  // Effect
  useEffect(() => {
    let unsubscribe: any = () => {};

    // Check user is locating in another room

    if (user?.uid) {
      const q = query(
        collection(db, "locations"),
        where("uid", "==", user.uid)
      );
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        // location = null if user is locating in another room
        if (querySnapshot.docs.length === 0) {
          setLocationState(null);
        } else {
          // location = {...} if user is locating in own room
          querySnapshot.forEach((doc) => {
            setLocationState(doc.data());
          });
        }
      });
    }

    return () => unsubscribe();
  }, [user?.uid]);

  // Data context
  const data: LocationContextData = {
    // Attribute
    location: locationState,
    // Method
  };

  return (
    <LocationContext.Provider value={data}>{children}</LocationContext.Provider>
  );
};

export default LocationContextProvider;
