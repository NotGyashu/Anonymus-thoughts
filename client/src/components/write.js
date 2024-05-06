import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../context/authcontext";

export const Write = () => {
  const [data, setData] = useState({});
const {user} = useContext(AuthContext)
  const Post = async (e) => {
    e.preventDefault();
    console.log(data);
    
    try {
      const postData = { ...data, author: user._id };
      const entry = await axios.post("api/add", postData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Successfully submitted:", entry.data);
      window.location.reload();

      // Add additional logic if needed after a successful submission
    } catch (err) {
      console.error("Error in data submission:", err);

      // Add additional error handling logic if needed
    }
  };

  const input = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div class="top-0 left-0 w-full h-full z-20 fixed bg-black bg-opacity-30 flex items-center justify-center">
      <div className=" lg:w-[50vw] md:w-[70vw]  w-[90vw] box-shadow lg:p-5 md:p-4 p-2 mt-3 rounded bg-white">
        <form
          className="flex flex-col h-full gap-2  font-cookie text-xl text-[#2d0d4a]"
          onSubmit={Post}
        >
          <div class="w-full flex gap-1 md:gap-3">
            <input
              id="title"
              required
              placeholder="Give it a title"
              className="focus:outline-none border p-1 w-full rounded border-gray-300 hover:border-gray-500"
              onChange={input}
            />

            <select
              id="category"
              name="category"
              required
              class="block appearance-none w-[20%] bg-white border border-gray-300 hover:border-gray-500 px-1 md:px-4  md:pr-4 lg:pr-8 rounded leading-tight focus:outline-none   transition duration-500 ease-in-out"
              onChange={input}
            >
              <option value="" disabled selected hidden>
                Category
              </option>
              <option value="dark" class="text-[#2d0d4a] hover:bg-#2d0d4a">
                Dark
              </option>
              <option value="laugh" class="text-[#2d0d4a] hover:bg-#2d0d4a">
                Laugh
              </option>
              <option value="sad" class="text-[#2d0d4a] hover:bg-#2d0d4a">
                Sad
              </option>
              <option value="cringe" class="text-[#2d0d4a] hover:bg-#2d0d4a">
                Cringe
              </option>
            </select>
          </div>
          <textarea
            id="content"
            required
            className="focus:outline-none w-inherit border border-gray-300 hover:border-gray-400 rounded resize-none p-1 h-full"
            rows="6" // Set the maximum number of rows
            placeholder="Write your thoughts"
            onChange={input}
          ></textarea>
          <div className="flex justify-between">
            <input
              id="falseName"
              placeholder="False Name"
              class="focus:outline-none border rounded px-1 w-[20%] border-gray-300 hover:border-gray-500"
              onChange={input}
            />
            <button class="focus:outline-none border px-4 rounded bg-[#2d0d4a] text-white">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
