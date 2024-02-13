import React, { useState, useEffect } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorderTwoToneIcon from "@mui/icons-material/FavoriteBorderTwoTone";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

const Modal = ({ isOpen, onClose, post }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [enable, setEnable] = useState(false);
  const [data, setData] = useState(post);

  useEffect(() => {
    // Update the state with the initial post data when the component mounts
    setData(post);
  }, [post]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    // Implement edit functionality here
    setEnable(true);
    console.log("edit");
    handleClose();
  };

  const handleDelete = async () => {
    // Implement delete functionality here
    const result = await axios.delete(`/api/${data._id}`);
    window.location.reload();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const Edit = async (e) => {
    e.preventDefault();
    try {
      console.log(data);
    const res =  await axios.put(`/api/${post._id}`, data);
      if(res.status == 200){
        setEnable(false)
      }else{
        window.alert("err")
      }
    } catch (err) {
      console.log("err in editing", err);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <form className="bg-white p-8 rounded shadow-md text-xl text-[#2d0d4a] w-[50vw] h-[60vh]  font-cookie relative">
        <div className="flex justify-between mb-4 ">
          <input
            className={`text-2xl font-bold w-full ${
              enable ? "" : "focus: outline-none"
            }`}
            value={data?.title}
            readOnly={!enable}
            onChange={handleChange}
            name="title"
          />
          <MoreVertIcon onClick={handleClick} />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>
        </div>
        <textarea
          value={data?.content}
          className={`w-full h-[75%] resize-none ${
            enable ? "" : "focus: outline-none"
          }`}
          readOnly={!enable}
          onChange={handleChange}
          name="content"
        />

        <div class="flex justify-between">
          <input
            class=" mb-[1em]"
            value={data?.falseName}
            readOnly={!enable}
            onChange={handleChange}
            name="falseName"
          />
          <div>
            {enable ? (
              <button
                className={`text-white absolute bottom-4 right-20 px-2 rounded-md bg-[#2d0d4a] ${
                  enable ? "" : "focus: outline-none"
                }`}
                onClick={Edit}
              >
                Edit
              </button>
            ) : (
              <button
                className="text-gray-600 absolute bottom-4 right-20 hover:text-gray-800"
                onClick={onClose}
              >
                Close
              </button>
            )}
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
      </form>
    </div>
  );
};

export default Modal;
