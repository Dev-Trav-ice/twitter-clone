import React from "react";
import Button from "./Button";

function DeleteModal({ onClick, setToggleDeleteModal, loading }) {
  return (
    <div className="absolute top-0 right-0 w-screen flex items-center justify-center h-screen z-10 bg-slate-700/50">
      <div className="px-8 py-4 rounded-lg bg-black border border-[#2f2f30]">
        <h1 className="my-4 text-sm md:text-lg md:font-semibold capitalize">
          Are you sure you want to delete this post?
        </h1>
        <div className="flex items-center justify-center gap-4">
          <Button
            name={"cancel"}
            onClick={(prev) => setToggleDeleteModal(!prev)}
            className={
              "px-4 py-1.5 bg-blue-800 text-white cursor-pointer rounded-lg"
            }
          />
          <Button
            name={"delete"}
            loading={loading}
            color={"white"}
            onClick={onClick}
            className={
              "px-4 py-1.5 bg-red-800 text-white cursor-pointer rounded-lg"
            }
          />
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
