import { db } from "@/configs/firebase";
import { useRoom } from "@/hooks/index";
import { Message } from "@/interfaces/index";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { createContext, ReactNode, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface ChatContextProps {
  children: ReactNode;
}

interface ChatContextDefaultData {
  messages: Message[];

  addMessage: (data: Message) => Promise<void>;
}

const chatContextDefaultData: ChatContextDefaultData = {
  messages: [],

  addMessage: (data: Message) => Promise.resolve(void 0),
};

export const ChatContext = createContext<ChatContextDefaultData>(
  chatContextDefaultData
);

const ChatContextProvider = ({ children }: ChatContextProps) => {
  const { room } = useRoom();

  const [messages, setMessages] = useState<Message[]>(
    chatContextDefaultData.messages
  );

  useEffect(() => {
    let unsubscribe: any = () => {};

    if (room.id) {
      const q = query(
        collection(db, "chats"),
        where("room", "==", room.id),
        orderBy("createdAt")
      );
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        // location = null if user is locating in another room
        if (querySnapshot.docs.length !== 0) {
          const data: Message[] = [];

          querySnapshot.docs.forEach((doc) => {
            data.push(doc.data() as Message);
          });
          setMessages(data);
        } else {
          setMessages([]);
        }
      });
    }

    return () => unsubscribe();
  }, [room.id]);

  const addMessage = async (data: Message) => {
    const { room, sender, content } = data;
    setMessages([
      ...messages,
      {
        id: uuidv4(),
        room,
        sender,
        content,
      },
    ]);

    // Add mess
    await addDoc(collection(db, "chats"), {
      id: uuidv4(),
      room,
      sender,
      content,
      createdAt: serverTimestamp(),
    });
  };

  const dataContext: ChatContextDefaultData = {
    messages,
    addMessage,
  };
  return (
    <ChatContext.Provider value={dataContext}>{children}</ChatContext.Provider>
  );
};

export default ChatContextProvider;
