import axios from "axios";
import React, { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {useNavigate}  from "react-router-dom";
import AuthContext from "../context/AuthContext";


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {isAuth}= useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      const data = await res.data;
      if (res.status === 200) {
        toast.success(data.message);
        isAuth(true);
        navigate('/profile')
      } else {
        return toast.error(data.message);
      }
    } catch (error) {
      return toast.error(error);
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-col gap-3 rounded-md shadow-md w-fit p-3 mx-auto my-[30vh]">
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="px-2 border-2 rounded-lg py-2 w-[300px] border-purple-100 transition-all delay-100 ease-in-out focus:border-purple-500 outline-none"
        />
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="px-2 border-2 rounded-lg py-2 w-[300px] border-purple-100 transition-all delay-100 ease-in-out focus:border-purple-500 outline-none"
        />
        <button
          type="submit"
          onClick={handleLogin}
          className="px-3 py-2 bg-purple-500 rounded-full text-white shadow-md"
        >
          Log in
        </button>
      </div>
    </>
  );
};

export default Login;
