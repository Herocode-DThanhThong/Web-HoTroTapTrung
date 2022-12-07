import { useBackground } from "@/hooks/index";
import Image from "next/image";

const ChangeSet = () => {
  const { typeBg, handleChangeSetChange } = useBackground();

  return (
    <div className="absolute scrollbar-hidden px-8 w-[400px] overflow-scroll h-[550px] -top-[250px] bg-opacity-90  rounded-3xl -left-2 bottom-0 -translate-x-full bg-black p-4">
      <div className="">
        <h1 className="font-bold text-white text-2xl capitalize">Change set</h1>

        <div
          onClick={() => {
            handleChangeSetChange("exterior");
          }}
          className="h-[200px] relative mt-4"
        >
          {typeBg === "cafe" || typeBg === "exterior" ? null : (
            <div className="overlay"></div>
          )}
          <Image layout="fill" src={"/changeset/bookcafe.png"} alt="" />
        </div>
        <div
          onClick={() => {
            handleChangeSetChange("kyoto");
          }}
          className="h-[200px] relative mt-4"
        >
          {typeBg !== "kyoto" && <div className="overlay"></div>}
          <Image
            className="z-[-1]"
            layout="fill"
            src={"/changeset/kyoto.png"}
            alt=""
          />
        </div>
        <div
          onClick={() => {
            handleChangeSetChange("winter");
          }}
          className="h-[200px] relative mt-4"
        >
          {typeBg === "winter" ? null : <div className="overlay"></div>}
          <Image
            className="z-[-1]"
            layout="fill"
            src={"/changeset/cottage.png"}
            alt=""
          />
        </div>

        <div className="h-[200px] relative mt-4">
          <div className="overlay"></div>
          <div className="absolute right-2 top-2">
            <span className="">💎</span>
          </div>
          <Image
            className="z-[-1]"
            layout="fill"
            src={"/changeset/chill.png"}
            alt=""
          />
        </div>
        <div className="h-[200px] relative mt-4">
          <div className="overlay"></div>
          <div className="absolute right-2 top-2">
            <span className="">💎</span>
          </div>
          <Image
            className="z-[-1]"
            layout="fill"
            src={"/changeset/dreamin.png"}
            alt=""
          />
        </div>
        <div className="h-[200px] relative mt-4">
          <div className="overlay"></div>
          <div className="absolute right-2 top-2">
            <span className="">💎</span>
          </div>
          <Image
            className="z-[-1]"
            layout="fill"
            src={"/changeset/lofidesk.png"}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default ChangeSet;
