import React, { useState } from "react";
import { usePlaylist, useRoom, useUser } from "@/hooks/index";

const EnterRoomInput = () => {
  // State
  const [idRoom, setIdRoom] = useState("");

  // Context
  const { room, enterRoom } = useRoom();
  const { user } = useUser();
  const { resetVolumnOptionSongs } = usePlaylist();

  return (
    <div className="capitalize p-2 flex gap-2 justify-between items-center bg-white bg-opacity-30 rounded-md relative">
      <input
        value={idRoom}
        onChange={(e) => {
          setIdRoom(e.target.value);
        }}
        type="text"
        placeholder="Enter ID Room ..."
        className="bg-transparent  outline-none text-white placeholder:text-white font-semibold"
      />
      <button
        onClick={() => {
          if (room.id === idRoom) {
            setIdRoom("");
            return alert("You can't enter room yourself");
          }

          if (room.guests.length > 0) {
            setIdRoom("");
            return alert(
              "You can't enter another room because you are working with other people"
            );
          }

          // Enter
          enterRoom({
            uid: user?.uid,
            roomId: idRoom,
            userRequest: user,
          });

          // Reset volumn because when change diffrent room you cann't options nodes => set all to default
          resetVolumnOptionSongs();
        }}
        className="bg-blue-600 font-semibold hover:opacity-75  p-1 rounded-md text-sm px-2 text-white"
      >
        Join
      </button>
    </div>
  );
};

export default EnterRoomInput;
