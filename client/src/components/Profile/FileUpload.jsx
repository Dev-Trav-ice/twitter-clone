import { useRef } from "react";
import CoverImage from "./CoverImage";
import { IoCameraOutline } from "react-icons/io5";
import Avatar from "../Shared/Avatar";

function FileUpload({ profileSrc, coverSrc, setCoverImage, setProfileImage }) {
  const ProfilePicfileRef = useRef();
  const coverPicfileRef = useRef();

  return (
    <div className="relative">
      <div className="w-full relative h-[150px] md:h-[220px]">
        <CoverImage src={coverSrc} />
        <input
          type="file"
          ref={coverPicfileRef}
          accept="image/*"
          onChange={(e) => setCoverImage(e.target.files[0])}
          hidden
        />
        <div className="absolute top-[50%] right-[50%] bg-black/80 p-2 cursor-pointer rounded-full flex items-center justify-center">
          <IoCameraOutline
            onClick={() => coverPicfileRef.current.click()}
            className="text-sm"
          />
        </div>
      </div>
      <div className="flex relative items-center justify-between px-4">
        <div className="w-[100px] h-[100px] bg-white rounded-full border-3 border-black absolute -bottom-12 left-3">
          <Avatar src={profileSrc} />
          <div
            onClick={() => ProfilePicfileRef.current.click()}
            className="bg-black/80 p-2 cursor-pointer rounded-full flex items-center justify-center absolute top-10 right-8"
          >
            <IoCameraOutline className="text-sm" />
            <input
              type="file"
              ref={ProfilePicfileRef}
              onChange={(e) => setProfileImage(e.target.files[0])}
              hidden
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
