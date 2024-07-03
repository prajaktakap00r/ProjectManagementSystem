import { createPortal } from "react-dom";
import { useRef, forwardRef, useImperativeHandle } from "react";

const Modal = forwardRef(function Modal({ children, buttonCaption }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => ({
    open() {
      dialog.current.showModal();
    },
    close() {
      dialog.current.close();
    },
  }));

  return createPortal(
    <dialog
      ref={dialog}
      className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md border-red-500 border-2 bg-black"
    >
      {children}
      <form method="dialog" className="mt-4 text-right">
        <button className="px-4 py-2 text-xs md:text-base rounded-md text-pink-200 bg-red-600 hover:bg-pink-50 hover:text-red-600">
          {buttonCaption}
        </button>
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
});

export default Modal;
