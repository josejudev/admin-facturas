import FormModal from "./FormModal";

const Modal = ({ isVisible, onClose }) => {
  if (!isVisible) return null;
  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="w-[900px] flex flex-col">
        <button
          onClick={() => onClose()}
          className="text-white bg-red-500 text-sm place-self-end border border-red-500 rounded-full w-8 h-8 flex mb-3 justify-center items-center"
        >
          X
        </button>
        <FormModal />
      </div>
    </div>
  );
};

export default Modal;
