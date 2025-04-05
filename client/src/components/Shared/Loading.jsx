import FadeLoader from "react-spinners/ClipLoader";

function Loading() {
  return (
    <div className="w-full h-full overflow-hidden flex items-center justify-center">
      <FadeLoader
        color={"#1DA1F2"}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loading;
