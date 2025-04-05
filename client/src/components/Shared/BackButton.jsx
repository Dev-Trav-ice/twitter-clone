import { FaArrowLeft } from "react-icons/fa";

function BackButton() {
  return (
    <button
      className="p-2 hover:bg-white/10 rounded-full cursor-pointer"
      onClick={() => window.history.back()}
    >
      <FaArrowLeft />
    </button>
  );
}

export default BackButton;
