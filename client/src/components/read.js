import React, { useEffect, useState } from "react";
import Modal from "./modal";
import axios from "axios";
export const Read = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
axios.defaults.withCredentials = true ;
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get("api/all");
        setPosts(response.data);
      
      } catch (err) {
        console.log("err in fetching posts", err);
      }
    };

    fetchPost();
  }, [posts._id]);

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
  return (
    <div class="grid grid-cols-4 gap-3 p-1 relative">
      {posts.map((post) => (
        <div
          key={post._id}
          className="box-shadow col-span-1 p-2  rounded font-cookie text-[#2d0d4a] text-xl relative flex flex-col item-center"
        >
          <div className="flex justify-between px-3  ">
            <h2 class="font-bold ">{post.title}</h2>
            <span class="text-xs">{post.category}</span>
            <div
              
              className="h-[1.5em] w-[1.5em] rounded-full border border-purple-900"
            />
          </div>
          <p className="flex-grow">{trimContent(post.content, 40)}.....</p>

          <div className="relative bottom-0  ">
            <div class="flex justify-between">
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

      <Modal isOpen={openDialog} onClose={closeModal} post={selectedPost} />
    </div>
  );
};
