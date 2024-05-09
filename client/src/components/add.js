import React, { useState } from "react";
import { Write } from "./write";
import Record from "./record";

const Add = () => {
  const [write, setWrite] = useState(false);
  const [record, setRecord] = useState(false);
  return (
    <div className="top-0 left-0 w-full h-full  fixed bg-black bg-opacity-30 flex items-center justify-center">
      {write ? (
        <Write />
      ) : record ? (
        <Record/>
      ) : (
        <div className="lg:w-[50vw] md:w-[70vw]  w-[90vw] box-shadow lg:p-5 md:p-4 p-2 mt-3 rounded bg-white flex justify-center gap-5 ">
          <button className="focus:outline-none border p-2 rounded bg-[#2d0d4a] text-white text-sm
          " onClick={()=>{
            setWrite(true)
          }}>
            Write
          </button>
          <button className="focus:outline-none border p-2 rounded bg-[#2d0d4a] text-white text-sm
          " onClick={()=>{
            setRecord(true);
          }}>
            Record
          </button>
        </div>
      )}
    </div>
  );
};

export default Add;
