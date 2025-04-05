function CoverImage({ src }) {
  return (
    <div className="w-full h-full bg-gray-500">
      <img
        className="w-full h-full object-cover "
        src={src}
        alt=""
        loading="lazy"
      />
    </div>
  );
}

export default CoverImage;
