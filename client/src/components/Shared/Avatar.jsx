import { Link } from "react-router-dom";

function Avatar({ src, to }) {
  return (
    <Link to={to}>
      <img
        className="w-full h-full rounded-full object-cover"
        src={src}
        alt=""
      />
    </Link>
  );
}

export default Avatar;
