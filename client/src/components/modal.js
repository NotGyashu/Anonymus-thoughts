import React from "react";
import FavoriteBorderTwoToneIcon from "@mui/icons-material/FavoriteBorderTwoTone";
const Modal = ({ isOpen, onClose,post }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white p-8 rounded shadow-md text-xl text-[#2d0d4a] w-[50vw] h-[60vh]  font-cookie relative">
        <div className="flex justify-between mb-4 ">
          <h2 className="text-2xl font-bold">{post?.title}</h2>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <p>{post?.content}</p>

        <div class=" flex justify-between">
          <span class=" absolute bottom-0 mb-[1em]">
            posted by {post?.falseName}
          </span>
          <FavoriteBorderTwoToneIcon
            style={{
              height: "2vh",
              position: "absolute",
              bottom: 0,
              right: 0,
              marginRight: "1em",
              marginBottom: "1em",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
