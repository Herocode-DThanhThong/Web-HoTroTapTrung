import { Blocks } from "react-loader-spinner";
const Loading = () => {
  return (
    <div
      className="modal fixed top-0 left-0 right-0 bottom-0 bg-[rgba(51,51,51,.8)] flex items-center justify-center"
      style={{
        zIndex: "99",
      }}
    >
      <Blocks
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
      />
    </div>
  );
};

export default Loading;
