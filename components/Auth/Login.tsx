import { useUser, useGlobal } from "@/hooks/index";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import FormLogin from "../Form/FormLogin";
import Modal from "../Modal";
const Login = () => {
  const { toggleShowRegister, toggleShowLogin } = useGlobal();
  const { loginWithGoogle } = useUser();
  return (
    <Modal>
      <div className="bg-[#232931] rounded-md p-4 px-8">
        <div className="flex items-center justify-between text-white">
          <h1 className="text-xl">Sign in</h1>
          <button
            onClick={() => {
              toggleShowLogin(false);
            }}
          >
            <CloseIcon className="z-10" />
          </button>
        </div>

        <div className="flex justify-center items-center flex-col gap-4 mt-4">
          <div className="py-4 bg-white px-4 w-[250px] rounded-md flex flex-col gap-6">
            <FormLogin />
          </div>
          <button
            onClick={() => {
              loginWithGoogle();
            }}
            className="py-3 hover:opacity-80 px-4 w-[250px] items-center  text-white bg-white rounded-md flex gap-4"
          >
            <Image src="/googleIcon.png" width="24" height="24" alt="" />
            <span className="text-sm font-semibold text-gray-800">
              Sign in with Google
            </span>
          </button>
        </div>
        <p className="text-center text-gray-500 text-sm mt-4 leading-6">
          By continuing, you are indicating that you accept our{" "}
          <span className="text-blue-500">Terms of Service</span> and{" "}
          <span className="text-blue-500">Privacy Policy</span>.
        </p>
        <button
          onClick={() => {
            toggleShowRegister(true);
          }}
          className="text-center mx-auto bg-gradient-to-r rounded-md text-sm px-4 from-[#e18660e6] to-[#f4ca5de6] flex justify-center mt-4 text-white p-2"
        >
          Sign up
        </button>
      </div>
    </Modal>
  );
};

export default Login;
