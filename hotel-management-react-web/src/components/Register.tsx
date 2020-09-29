import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import hotelRoomImg from "../assets/hotel-room.jpg";
import api from "../services/http";
import { useDispatch } from "react-redux";

const Register: React.FC = () => {
  const router = useHistory();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [role, setRole] = useState("owner");

  const handleRegister = async () => {
    try {
      if (password != confirmPassword) {
        throw new Error("Passwords do not match");
      }
      const createdUser = await api.registerUser({
        username,
        password,
        fullname,
        role,
      });
      dispatch({ type: "SET_CURRENT_USER", payload: createdUser });
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
              Register
            </div>
            <div className="flex flex-wrap">
              <div className="w-full p-2">
                <input
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  className="shadow border rounded bg-transparent w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Fullname"
                />
              </div>
              <div className="w-1/2 p-2">
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="shadow border rounded bg-transparent w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  type="email"
                  placeholder="Username"
                />
              </div>
              <div className="w-1/2 p-2">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="shadow border rounded bg-transparent w-full text-gray-700 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="owner">Owner</option>
                  <option value="manager">Manager</option>
                  <option value="clerk">Clerk</option>
                  <option value="guest">Guest</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <div className="w-1/2 p-2">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="shadow border rounded bg-transparent w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div className="w-1/2 p-2">
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="shadow border rounded bg-transparent w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  placeholder="Confirm Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-center pt-5">
              <button
                onClick={(e) => handleRegister()}
                className="bg-pink-500 w-1/2 rounded-full hover:bg-pink-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
                type="button"
              >
                Register
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

export default Register;
