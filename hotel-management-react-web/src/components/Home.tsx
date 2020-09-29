import React from "react";
import hotelRoomImg from "../assets/hotel-room.jpg";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import OwnerDashboard from "./Dashboards/Owner";
import GuestDashboard from "./Dashboards/Guest";

const Home: React.FC = () => {
  const router = useHistory();
  const currentUser = useSelector((store: any) => store.current_user);
  const dispatch = useDispatch();
  const renderPage = (userRole: "owner" | "clerk" | "guest" | "manager") => {
    switch (userRole) {
      case "owner":
        return <OwnerDashboard />;
      case "clerk":
        return <p>Clerk UI</p>;
      case "guest":
        return <GuestDashboard />;
      case "manager":
        return <p>manager UI</p>;
      default:
        return <p>Unkown user role</p>;
    }
  };
  const handleLogout = () => {
    dispatch({ type: "SET_CURRENT_USER", payload: null });
    router.push("/");
  };
  return currentUser ? (
    <div className="flex">
      {renderPage(currentUser.role)}
      <button
        onClick={(e) => handleLogout()}
        className="absolute top-0 right-0 m-10 px-10 py-2 bg-red-700 hover:bg-red-800 text-white rounded overflow-hidden shadow-lg"
      >
        Log out
      </button>
    </div>
  ) : (
    <div className="flex">
      <div
        className="flex flex-wrap flex-col w-full pt-10 h-full justify-between content-center"
        style={{
          backgroundImage: `url(${hotelRoomImg})`,
          height: "100vh",
          backgroundRepeat: "none",
          backgroundSize: "cover",
          color: "#fff",
        }}
      >
        <div className="uppercase tracking-wide text-pink-600 text-4xl font-bold text-center">
          Hotel Management
        </div>
        <div className=" w-1/2">
          <div className="flex justify-center content-center py-10 my-10">
            <div
              onClick={(e) => {
                router.push("/login");
              }}
              className="w-1/2 rounded overflow-hidden shadow-lg hover:bg-pink-900 hover:bg-opacity-75 cursor-pointer"
            >
              <div className="px-6 py-4">
                <div className="font-bold text-4xl mb-2 text-center">Login</div>
                <p className="text-white-700 text-base text-center">
                  You can login as a manager | owner | guest | clerk
                </p>
              </div>
            </div>
            <div
              onClick={(e) => {
                router.push("/register");
              }}
              className="w-1/2 rounded overflow-hidden shadow-lg hover:bg-pink-900 hover:bg-opacity-75 cursor-pointer"
            >
              <div className="px-6 py-4">
                <div className="font-bold text-4xl mb-2 text-center">
                  Register
                </div>
                <p className="text-white-700 text-base text-center">
                  Create your account today
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
