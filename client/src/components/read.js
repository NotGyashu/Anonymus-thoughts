import React, { useContext, useEffect, useState } from "react";
import Modal from "./modal";
import axios from "axios";
import { AuthContext } from "../context/authcontext";

export const Read = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [audio,setAudio] = useState(null);
const {user} = useContext(AuthContext)
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`api/all/${user._id}`);
        setPosts(response.data);
        console.log(posts);
      } catch (err) {
        console.log("err in fetching posts", err);
        // Handle error appropriately, e.g., setPosts([]) or show an error message.
      }
    };

    fetchPost();
 
  }, []);

  const handleReadClick = (post) => {
    setSelectedPost(post);
    setOpenDialog(true);
  };

  const closeModal = () => {
    setOpenDialog(false);
  };

  function trimContent(content, maxWords) {
    const words = content.split(" ");
    const trimmedWords = words.slice(0, maxWords);
    return trimmedWords.join(" ");
  }

  // Ensure that posts is an array before attempting to map
  const postsArray = Array.isArray(posts) ? posts : [];

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3 p-1 relative">
      {postsArray.map((post) => (
        <div
          key={post._id}
          className="box-shadow col-span-1 p-2 rounded font-cookie text-[#2d0d4a] text-xl relative flex flex-col item-center"
        >
          <div className="flex justify-between px-3">
            <h2 className="font-bold">{post.title}</h2>
            <span className="text-xs">{post.category}</span>
            <div className="h-[1.5em] w-[1.5em] rounded-full border border-purple-900" />
          </div>
          <p className="flex-grow">
            {post.content ? (
              <div className="py-2">{trimContent(post.content, 40) + "....."}</div>
            ) : (
              // Handle recorded blob as audio
              <audio controls className="w-full my-2 ">
                <source src={`api/audio/${post.voiceRecording}`} />
              </audio>
            )}
          </p>
          {console.log(posts.voiceRecording)}

          <div className="relative bottom-0">
            <div className="flex justify-between">
              <p>Posted by {post.falseName}</p>
              <button
                onClick={() => handleReadClick(post)}
                className="focus:outline-none border px-2 rounded bg-[#2d0d4a] text-white text-sm"
              >
                Read
              </button>
            </div>
          </div>
        </div>
      ))}

      { selectedPost && <Modal isOpen={openDialog} onClose={closeModal} post={selectedPost} />}
    </div>
  );
};
