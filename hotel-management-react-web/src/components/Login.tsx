import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import hotelRoomImg from "../assets/hotel-room.jpg";
import api from "../services/http";
import { useDispatch } from "react-redux";

const Login: React.FC = () => {
  const router = useHistory();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const loggedInUser = await api.loginUser(username, password);
      dispatch({ type: "SET_CURRENT_USER", payload: loggedInUser });
      router.replace("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex">
      <div
        className="flex flex-wrap flex-col w-full pt-10 h-full justify-around content-center"
        style={{
          backgroundImage: `url(${hotelRoomImg})`,
          height: "100vh",
          backgroundRepeat: "none",
          backgroundSize: "cover",
          color: "#fff",
        }}
      >
        <div className="w-1/2">
          <form className="bg-black shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="uppercase tracking-wide text-pink-600 text-4xl font-bold text-center">
              Login
            </div>
            <div className="mb-4 mx-20">
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="shadow border rounded bg-transparent w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="email"
                placeholder="Username"
              />
            </div>
            <div className="mb-6 mx-20">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow border rounded bg-transparent w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                onClick={(e) => handleLogin()}
                className="bg-pink-500 w-1/2 rounded-full hover:bg-pink-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
                type="button"
              >
                Login
              </button>
            </div>
          </form>
          <div className="flex items-center justify-center">
            <button
              onClick={(e) => router.push("/")}
              className="bg-red-700 bg-opacity-25 rounded-full border border-transparent hover:border-red-700 w-1/2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Go Home
            </button>
          </div>
          <p className="text-center text-gray-500 text-xs">
            &copy;2020 Hotel Management. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
