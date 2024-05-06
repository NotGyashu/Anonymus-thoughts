import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
 import { useNavigate } from "react-router-dom";

 const Register =()=>{
     const [data, setData] = useState({});
     const navigate = useNavigate();
     const Post = async (e) => {
       e.preventDefault();
       console.log(data);

       try {
         const entry = await axios.post("api/register", data, {
           headers: {
             "Content-Type": "application/json",
           },
         });
         console.log("Successfully submitted:");
         navigate("/login");
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
      <div className="top-0 left-0 w-full h-full z-20 fixed bg-black bg-opacity-30 flex items-center justify-center">
        <div className="lg:w-[30vw] md:w-[50vw] bg-white w-[90vw] box-shadow lg:p-5 md:p-4 p-2 mt-3 rounded bg-whit flex flex-col gap-6 items-center">
          <form
            className="flex flex-col h-full gap-8 w-full font-cookie text-xl text-[#2d0d4a]"
            onSubmit={Post}
          >
            <div class="w-full flex gap-1 md:gap-3">
              <input
                id="username"
                required
                placeholder="hey! whats ur name"
                className="focus:outline-none border p-1 w-full rounded border-gray-300 hover:border-gray-500"
                onChange={input}
              />
            </div>
            <div class="w-full flex gap-1 md:gap-3">
              <input
                id="email"
                required
                placeholder="Enter ur email"
                className="focus:outline-none border p-1 w-full rounded border-gray-300 hover:border-gray-500"
                onChange={input}
              />
            </div>
            <div class="w-full flex gap-1 md:gap-3">
              <input
                type="password"
                id="password"
                required
                placeholder="password"
                className="focus:outline-none border p-1 w-full rounded border-gray-300 hover:border-gray-500"
                onChange={input}
              />
            </div>

            <div className="flex justify-center">
              <button class="focus:outline-none border px-4 rounded bg-[#2d0d4a] text-white">
                register
              </button>
            </div>
          </form>
          <Link to="/login" className="text-xs text-[#2d0d4a] underline">Login?</Link>
        </div>
      </div>
    );
 }

 export default Register