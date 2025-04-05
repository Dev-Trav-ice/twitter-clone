import { MdDelete } from "react-icons/md";

function Delete({ onClick }) {
  return (
    <button onClick={onClick} className="cursor-pointer">
      <MdDelete />
    </button>
  );
}

export default Delete;
