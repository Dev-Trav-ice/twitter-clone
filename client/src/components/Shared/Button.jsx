import FadeLoader from "react-spinners/ClipLoader";

function Button({ onClick, type, color, className, name, loading, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      className={`${className} ${
        loading ? "cursor-not-allowed opacity-70" : "cursor-pointer"
      }`}
    >
      {loading ? (
        <FadeLoader
          color={color}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        name
      )}
    </button>
  );
}

export default Button;
