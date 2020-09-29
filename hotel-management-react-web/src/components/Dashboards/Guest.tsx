import React from "react";
import hotelRoomImg from "../../assets/hotel-room.jpg";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const GuestDashboard: React.FC = () => {
  const router = useHistory();
  const currentUser = useSelector((store: any) => store.current_user);
  if (!currentUser) {
    router.replace("/login");
    return (
      <div>
        <button onClick={(e) => router.replace("/login")}>Logout</button>
      </div>
    );
  }

  return (
    <div
      className="flex flex-wrap flex-col w-full pt-10 h-full justify-start content-center"
      style={{
        backgroundImage: `url(${hotelRoomImg})`,
        height: "100vh",
        backgroundRepeat: "none",
        backgroundSize: "cover",
        color: "#fff",
      }}
    >
      <div className="text-center">
        <p className="tracking-wide text-white text-4xl font-bold text-center">
          Welcome back
        </p>
        <p className="tracking-wide text-white text-2xl font-normal text-center">
          {currentUser.fullname}
        </p>
      </div>

      <div className="justify-center center m-20 w-full">
        <div className="flex justify-center content-center">
          <div className="w-1/2 border bg-black shadow-lg rounded">
            <p className="tracking-wide text-white text-3xl font-bold text-center py-5">
              My bookings
            </p>
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Manager</th>
                  <th className="px-4 py-2">Guest</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">Room 1</td>
                  <td className="border px-4 py-2">Adam</td>
                  <td className="border px-4 py-2"></td>
                  <td className="border px-4 py-2 bg-red-700 text-center">
                    <button className="bg-red-700">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>

            <p className="tracking-wide text-white text-3xl font-bold text-center py-5">
              Rooms available
            </p>
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Manager</th>
                  <th className="px-4 py-2">Guest</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">Room 1</td>
                  <td className="border px-4 py-2">Adam</td>
                  <td className="border px-4 py-2"></td>
                  <td className="border px-4 py-2 bg-red-700 text-center">
                    <button className="bg-red-700">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GuestDashboard;
