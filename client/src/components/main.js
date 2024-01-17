import React, { useState } from "react";
import { Read } from "./read";
import { Write } from "./write";
import AddIcon from "@mui/icons-material/Add";


const Main = () => {
  const [write,setWrite]= useState(false);
  return (
    <div className="flex-grow flex flex-col items-center p-2 gap-3">
      {(write && <Write />) || <Read />}

      <div
        class="fixed top-[70vh] right-[10vw] h-[3em] w-[3em] flex items-center justify-center rounded-full border cursor-pointer bg-[#703ba0] z-30"
        onClick={() => {
          setWrite(!write);
        }}
      >
        <AddIcon htmlColor="white" />
      </div>
    </div>
  );
};

export default Main;
