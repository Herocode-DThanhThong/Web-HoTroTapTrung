import { useBackground, useRoom } from "@/hooks/index";
const Background = () => {
  const {
    room: { background },
  } = useRoom();
  return (
    <>
      <video
        key={background.urlNoRaining}
        style={{ zIndex: "-4" }}
        className={`${
          !background.isRaining ? "opacity-100" : "opacity-0"
        } w-full transition-all ease-in-out duration-500 h-full object-cover absolute top-0 left-0 right-0 bottom-0`}
        loop
        autoPlay
        muted
      >
        <source src={background.urlNoRaining} type="video/mp4" />
      </video>
      {background.urlRaining ? (
        <video
          key={background.urlRaining}
          style={{ zIndex: "-4" }}
          className={`${
            background.isRaining ? "opacity-100" : "opacity-0"
          } w-full transition-all ease-in-out duration-500 h-full object-cover absolute top-0 left-0 right-0 bottom`}
          loop
          autoPlay
          muted
        >
          <source src={background.urlRaining} type="video/mp4" />
        </video>
      ) : null}
    </>
  );
};

export default Background;
