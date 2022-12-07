import Image from "next/image";
import { usePlaylist } from "@/hooks/index";

const Playlist = () => {
  const { typeSong, setTypeSong } = usePlaylist();
  return (
    <div className="absolute px-8 w-[400px] h-[320px] -top-2/3 bg-opacity-90  rounded-3xl -left-2 bottom-0 -translate-x-full bg-black p-4">
      {/* Playlist */}
      <h1 className="font-bold text-white text-2xl">Playlist</h1>
      <div className="grid mt-4 grid-cols-3 gap-4">
        <div
          onClick={() => {
            setTypeSong("sleep");
          }}
          className={`${
            typeSong === "sleep" ? "opacity-70" : "opacity-100"
          } py-2 flex flex-col gap-2 relative h-[150px] rounded-lg`}
        >
          <Image layout="fill" src={"/playlist/sleep.svg"} alt="" />

          <p className="text-sm text-center font-semibold tracking-wider">
            Sleepy
          </p>
        </div>
        <div
          onClick={() => {
            setTypeSong("jazzy");
          }}
          className={`${
            typeSong === "jazzy" ? "opacity-70" : "opacity-100"
          } py-2 flex flex-col gap-2 relative h-[150px] rounded-lg`}
        >
          <Image layout="fill" src={"/playlist/focus.svg"} alt="" />

          <p className="text-sm text-center font-semibold tracking-wider">
            Focus
          </p>
        </div>
        <div
          onClick={() => {
            setTypeSong("chill");
          }}
          className={`${
            typeSong === "chill" ? "opacity-70" : "opacity-100"
          } py-2 flex flex-col gap-2 relative h-[150px] rounded-lg`}
        >
          <Image layout="fill" src={"/playlist/chill.svg"} alt="" />

          <p className="text-sm text-center font-semibold tracking-wider">
            Chill
          </p>
        </div>
      </div>

      {/* Templates */}
      <h1 className="font-bold text-white text-2xl">Templates</h1>
      <p className="text-sm mt-2 text-gray-300">
        You have{"n't"} save any template yet, open the mixer to save one
      </p>
    </div>
  );
};

export default Playlist;
