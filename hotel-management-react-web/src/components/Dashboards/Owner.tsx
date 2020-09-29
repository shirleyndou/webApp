import React, { useState, useEffect } from "react";
import hotelRoomImg from "../../assets/hotel-room.jpg";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
// @ts-ignore
import Modal from "react-modal";
import api from "../../services/http";

const AddRoomModal: React.FC<any> = (props: {
  addRoomModalIsOpen: boolean;
  closeDialog: () => void;
  userId: number;
}) => {
  const [roomName, setRoomName] = useState("");
  const [roomPricePerNight, setRoomPricePerNight] = useState("");

  const createRoom = async () => {
    try {
      await api.createNewRoom({
        name: roomName,
        pricePerNight: +roomPricePerNight,
        ownerId: props.userId,
        managerId: null,
      });
      props.closeDialog();
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <Modal
      isOpen={props.addRoomModalIsOpen}
      onRequestClose={() => props.closeDialog()}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
      }}
      contentLabel="Adding a new room"
    >
      <form className="bg-black shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h3>Creating new room</h3>
        <div className="mb-4 mx-20">
          <input
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            className="shadow border text-white rounded bg-transparent w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Room name"
          />
        </div>
        <div className="mb-4 mx-20">
          <input
            value={roomPricePerNight}
            onChange={(e) => setRoomPricePerNight(e.target.value)}
            className="shadow border text-white rounded bg-transparent w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            placeholder="Room price per night"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={(e) => createRoom()}
            className="bg-pink-500 w-1/2 rounded-full hover:bg-pink-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
            type="button"
          >
            Save Room
          </button>
        </div>
      </form>
    </Modal>
  );
};

const UpdateRoomModal: React.FC<any> = (props: {
  addRoomModalIsOpen: boolean;
  closeDialog: () => void;
  userId: number;
  room: any;
}) => {
  const [roomName, setRoomName] = useState(props.room.name);
  const [roomPricePerNight, setRoomPricePerNight] = useState(
    props.room.pricePerNight
  );

  const createRoom = async () => {
    try {
      await api.updateRoom({
        id: props.room.id,
        name: roomName,
        pricePerNight: +roomPricePerNight,
      });
      props.closeDialog();
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <Modal
      isOpen={props.addRoomModalIsOpen}
      onRequestClose={() => props.closeDialog()}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
      }}
      contentLabel="Adding a new room"
    >
      <form className="bg-black shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h3>Creating new room</h3>
        <div className="mb-4 mx-20">
          <input
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            className="shadow border text-white rounded bg-transparent w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Room name"
          />
        </div>
        <div className="mb-4 mx-20">
          <input
            value={roomPricePerNight}
            onChange={(e) => setRoomPricePerNight(e.target.value)}
            className="shadow border text-white rounded bg-transparent w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            placeholder="Room price per night"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={(e) => createRoom()}
            className="bg-pink-500 w-1/2 rounded-full hover:bg-pink-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
            type="button"
          >
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};

const OwnerDashboard: React.FC = () => {
  const router = useHistory();
  const currentUser = useSelector((store: any) => store.current_user);
  const [rooms, setRooms] = useState([] as any[]);
  const [addRoomModalIsOpen, setAddRoomModalIsOpen] = React.useState(false);
  const [updatingRoomIndex, setUpdatingRoomIndex] = React.useState(-1);

  useEffect(() => {
    getRoomsForOwner();
  }, []);

  if (!currentUser) {
    router.replace("/login");
    return <div></div>;
  }

  const removeRoom = async (roomId: number) => {
    try {
      const rooms = await api.deleteRoomById(roomId);
      getRoomsForOwner();
    } catch (err) {
      alert(err.message);
    }
  };

  const editRoom = async (roomId: number) => {
    try {
      setUpdatingRoomIndex(roomId);
    } catch (err) {
      alert(err.message);
    }
  };

  const getRoomsForOwner = async () => {
    try {
      setUpdatingRoomIndex(-1);
      setAddRoomModalIsOpen(false);
      const rooms = await api.getRoomsByOwnerId(currentUser.id);
      console.log("rooms", rooms);
      setRooms(rooms);
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

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
      <AddRoomModal
        userId={currentUser.id}
        addRoomModalIsOpen={addRoomModalIsOpen}
        closeDialog={() => getRoomsForOwner()}
      />
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
          <div className="w-1/2 border bg-black shadow-lg rounded ">
            <p className="tracking-wide text-white text-3xl font-bold text-center py-5">
              Rooms{" "}
              <button
                onClick={(e) => setAddRoomModalIsOpen(true)}
                className="text-pink-500 rounded-full px-2"
              >
                +
              </button>
            </p>
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Manager</th>
                  <th className="px-4 py-2">Guest</th>
                  <th className="px-4 py-2">Price per night</th>
                  <th colSpan={2} className="px-4 py-2">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => {
                  return (
                    <tr>
                      <td className="border px-4 py-2">{room.name}</td>
                      <td className="border px-4 py-2">
                        {(room.manager && room.manager) || "----"}
                      </td>
                      <td className="border px-4 py-2">
                        {(room.guest && room.guest) || "----"}
                      </td>
                      <td className="border px-4 py-2">{room.pricePerNight}</td>
                      <td className="border px-4 py-2 bg-pink-700 text-center">
                        <UpdateRoomModal
                          room={room}
                          addRoomModalIsOpen={updatingRoomIndex == room.id}
                          closeDialog={() => getRoomsForOwner()}
                        />
                        <button onClick={(e) => editRoom(room.id)}>
                          <svg
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="pencil w-6 h-6"
                          >
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                          </svg>
                        </button>
                      </td>
                      <td className="border px-4 py-2 bg-red-700 text-center">
                        <button
                          onClick={(e) => removeRoom(room.id)}
                          className="bg-red-700"
                        >
                          <svg
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="trash w-6 h-6"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
