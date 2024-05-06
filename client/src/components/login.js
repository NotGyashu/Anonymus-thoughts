import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import  {AuthContext}  from "../context/authcontext"; 
const Login = () => {
  const [data, setData] = useState({});
  const { user, error, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();
 
  const Post = async (e) => {
    e.preventDefault();
    console.log(data);
login(data)
  }


  const input = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [id]: value }));
  };
  return (
    <div className="top-0 left-0 w-full h-full z-20 fixed bg-black bg-opacity-30 flex items-center justify-center">
      <div className="lg:w-[30vw] md:w-[50vw] bg-white w-[90vw] box-shadow lg:p-5 md:p-4 p-2 mt-3 rounded ">
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
              Login
            </button>
          </div>
        </form>
        <Link to="/register" className="text-xs text-[#2d0d4a] underline">
          register?
        </Link>
      </div>
    </div>
  );
};

export default Login;
