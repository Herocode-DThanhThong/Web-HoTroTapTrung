import { useGlobal } from "@/hooks/index";
import CloseIcon from "@mui/icons-material/Close";
import FormRegister from "../Form/FormRegister";
import Modal from "../Modal";
const Register = () => {
  const { toggleShowLogin, toggleShowRegister } = useGlobal();

  return (
    <Modal>
      <div className="bg-[#232931] rounded-md p-4 px-8">
        <div className="flex items-center justify-between text-white">
          <h1 className="text-xl">Sign up</h1>
          <button
            onClick={() => {
              toggleShowRegister(false);
            }}
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex justify-center items-center flex-col gap-4 mt-4">
          <div className="py-4 bg-white px-4 w-[250px] rounded-md flex flex-col gap-6">
            <FormRegister />
          </div>
        </div>
        <p className="text-center text-gray-500 text-sm mt-4 leading-6">
          By continuing, you are indicating that you accept our{" "}
          <span className="text-blue-500">Terms of Service</span> and{" "}
          <span className="text-blue-500">Privacy Policy</span>.
        </p>
        <button
          onClick={() => {
            toggleShowLogin(true);
          }}
          className="text-center mx-auto bg-gradient-to-r rounded-md text-sm px-4 from-[#e18660e6] to-[#f4ca5de6] flex justify-center mt-4 text-white p-2"
        >
          Sign In
        </button>
      </div>
    </Modal>
  );
};

export default Register;
