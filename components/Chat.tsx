import { useChat, useRoom, useUser } from "@/hooks/index";
import { Message, User } from "@/interfaces/index";
import MessageIcon from "@mui/icons-material/Message";
import { Avatar, Tooltip } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { FormEvent, useEffect, useRef, useState } from "react";
import Badge from "@mui/material/Badge";
const Chat = () => {
  const { messages, addMessage } = useChat();
  const {
    room: { id: roomId, owner },
  } = useRoom();
  const { user } = useUser();
  const enOfMessagesRef = useRef<HTMLDivElement | null>(null);
  const [isChatting, setIsChatting] = useState(false);
  const [mess, setMess] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addMessage({
      id: "",
      content: mess,
      room: roomId,
      sender: user as User,
    });

    setMess("");

    enOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed left-4 bottom-4">
      {/* Button Click */}
      <div className="flex gap-4 items-center">
        <button
          onClick={() => {
            setIsChatting(!isChatting);
          }}
          className="text-white shadow-xl bg-gradient-to-r to-[#e18660e6] from-[#f4ca5de6] p-3 rounded-full cursor-pointer hover:opacity-80"
        >
          <MessageIcon />
        </button>
        <span className="ribbon py-1">
          <span className="px-4">Chat Room</span>
        </span>
      </div>

      {/* Content */}
      <form onSubmit={handleSubmit}>
        <div
          className={`${
            isChatting ? "opacity-100" : "opacity-0"
          } transition-all ease-in-out duration-300 w-[300px] flex flex-col justify-between h-[450px] scrollbar-hidden overflow-scroll absolute bg-white bg-opacity-50 rounded-lg -top-[460px]`}
        >
          <div className="">
            <h1 className="text-center sticky top-0 z-10 font-semibold text-xl bg-gradient-to-r to-[#e18660e6] from-[#f4ca5de6] text-white py-2">
              Room
            </h1>
            <div className="mt-4">
              <div className="px-4 max-h-[350px] overflow-auto scrollbar-hidden">
                <div className="flex gap-2 mb-4 items-center">
                  <Tooltip title={user?.email}>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      badgeContent={<span>🗝️</span>}
                    >
                      <Avatar>{user?.displayName?.slice(0, 1)}</Avatar>
                    </Badge>
                  </Tooltip>

                  <div className="bg-white px-2 py-2 rounded-md">
                    <p className="text-sm text-center">
                      Welcome to {user?.displayName} {"'s"} Room
                    </p>
                  </div>
                </div>
              </div>
              {/* Message */}
              {messages.length > 0
                ? messages.map((mess, idx) => (
                    <div
                      key={mess.id}
                      className="px-4 max-h-[350px] overflow-auto scrollbar-hidden"
                    >
                      <div className="flex gap-2 mb-4 items-center">
                        <Tooltip title={mess.sender.email}>
                          {mess.sender?.uid === owner?.uid ? (
                            <Badge
                              overlap="circular"
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                              }}
                              badgeContent={<span>🗝️</span>}
                            >
                              <Avatar>
                                {mess.sender.displayName?.slice(0, 1)}
                              </Avatar>
                            </Badge>
                          ) : (
                            <Avatar>
                              {mess.sender.displayName?.slice(0, 1)}
                            </Avatar>
                          )}
                        </Tooltip>

                        <div className="bg-white px-2 py-1 rounded-md">
                          <span className="text-sm">{mess.content}</span>
                        </div>
                      </div>
                    </div>
                  ))
                : null}
            </div>

            <div ref={enOfMessagesRef} className="mt-16"></div>
          </div>

          {/* Enter Message */}
          <div className="sticky z-10 w-full bg-white h-[40px] bottom-0">
            <input
              value={mess}
              onChange={(e) => {
                setMess(e.target.value);
              }}
              type="text"
              className="w-full h-full outline-none px-3 py-2 text-sm"
              placeholder="Enter your message..."
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Chat;
