import { useGlobal, useRoom } from "@/hooks/index";
import Modal from "./Modal";
import CloseIcon from "@mui/icons-material/Close";

const Info = () => {
  const { toggleShowInfo } = useGlobal();
  const { room } = useRoom();
  return (
    <Modal>
      <div className="bg-white rounded-md p-4 px-8">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl text-gray-800 font-semibold">
            Your information
          </h1>
          <button
            onClick={() => {
              toggleShowInfo(false);
            }}
          >
            <CloseIcon className="z-10" />
          </button>
        </div>
        <div className="mt-2">
          <span className="font-semibold">Display Name</span>
          <div className="bg-gray-300 text-gray-600 p-2 mt-2 rounded-md">
            {room.owner?.displayName}
          </div>
        </div>
        <div className="mt-2">
          <span className="font-semibold">Email</span>
          <div className="bg-gray-300 text-gray-600 p-2 mt-2 rounded-md">
            {room.owner?.email}
          </div>
        </div>
        <div className="mt-2">
          <span className="font-semibold">Room ID</span>
          <div className="bg-gray-300 text-gray-600 p-2 mt-2 rounded-md">
            {room.id}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Info;
