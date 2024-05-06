import React, { useState } from "react";
import { Read } from "./read";
import AddIcon from "@mui/icons-material/Add";
import Add from "./add";

const Main = () => {
  const [add, setAdd] = useState(false);
  return (
    <div className="flex-grow flex custom-scrollbar flex-col items-center p-2 gap-3">
      {(add && <Add />) || <Read />}

      <div
        class="fixed top-[85vh] md:top-[70vh] right-[10vw] h-[3em] w-[3em] flex items-center justify-center rounded-full border cursor-pointer bg-[#703ba0] z-30"
        onClick={() => {
          setAdd(!add);
        }}
      >
        <AddIcon htmlColor="white" />
      </div>
    </div>
  );
};

export default Main;
