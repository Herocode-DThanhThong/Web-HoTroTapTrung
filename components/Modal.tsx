import { ReactNode } from "react";
interface ModalProps {
  children: ReactNode;
}
const Modal = ({ children }: ModalProps) => {
  return (
    <div
      className="modal fixed top-0 left-0 right-0 bottom-0 bg-[rgba(51,51,51,.8)] flex items-center justify-center"
      style={{
        zIndex: "99",
      }}
    >
      <div className="modal-content w-[500px]">{children}</div>
    </div>
  );
};

export default Modal;
