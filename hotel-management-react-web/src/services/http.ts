import axios from "axios";

//initializing an instance of axios and I passed in the objects
const request = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-type": "application/json",
  },
});

const loginUser = (username: string, password: string) => {
  return new Promise((resolve, reject) => {
    request
      .post(`/api/account/login`, { username, password })
      .then((v: any) => {
        if (v.data && v.data.status) {
          return resolve(v.data.data);
        } else if (v.data && !v.data.status) {
          return reject(new Error(v.data.message));
        } else {
          return reject(
            new Error("An unknown error has occcured, try again later.")
          );
        }
      })
      .catch((err) => {
        console.log("Unable to process your request", err);
        return reject(
          new Error("Unable to process your request, try again later")
        );
      });
  });
};

const registerUser = (userDetails: {}) => {
  return new Promise((resolve, reject) => {
    request
      .post(`/api/account/register`, userDetails)
      .then((v: any) => {
        if (v.data && v.data.status) {
          return resolve(v.data.data);
        } else if (v.data && !v.data.status) {
          return reject(new Error(v.data.message));
        } else {
          return reject(
            new Error("An unknown error has occured, try again later.")
          );
        }
      })
      .catch((err) => {
        console.log("Unable to process your request", err);
        return reject(
          new Error("Unable to process your request, try again later")
        );
      });
  });
};

const getRoomsByOwnerId = (ownerId: number): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    request
      .get(`/api/room/get/rooms/by/ownerid/${ownerId}`)
      .then((v: any) => {
        if (v.data && v.data.data) {
          return resolve(v.data.data);
        } else if (v.data && !v.data.status) {
          console.log(v.data);
          return reject(new Error(v.data.message));
        } else {
          return reject(
            new Error("An unknown error has occured, try again later.")
          );
        }
      })
      .catch((err) => {
        console.log("Unable to process your request", err);
        return reject(
          new Error("Unable to process your request, try again later.")
        );
      });
  });
};

const createNewRoom = (roomDetails: {
  name: string;
  pricePerNight: number;
  ownerId: number;
  managerId: number | null;
}) => {
  return new Promise((resolve, reject) => {
    request
      .post(`/api/room/create`, roomDetails)
      .then((v: any) => {
        if (v.data && v.data.data) {
          return resolve(v.data.data);
        } else if (v.data && !v.data.status) {
          return reject(new Error(v.data.message));
        } else {
          return reject(
            new Error("An unknown error has occurred, try again later")
          );
        }
      })
      .catch((err) => {
        console.log("Unable to processs your reguest", err);
        return reject(
          new Error("Unable to process your request, try again later")
        );
      });
  });
};

const updateRoom = (roomDetails: {
  id: number;
  name: string;
  pricePerNight: number;
}) => {
  return new Promise((resolve, reject) => {
    request
      .post(`/api/room/update`, roomDetails)
      .then((v: any) => {
        if (v.data && v.data.status) {
          return resolve(v.data.data);
        } else if (v.data && !v.data.status) {
          return reject(
            new Error("An uknown error has occurred, try again later")
          );
        }
      })
      .catch((err) => {
        console.log("Unable to process your request", err);
        return reject(
          new Error("Unable to process your request, try again later")
        );
      });
  });
};

const deleteRoomById = (roomId: number) => {
  return new Promise((resolve, reject) => {
    request
      .post(`/api/room/delete`, { roomId })
      .then((v: any) => {
        if (v.data && v.data.status) {
          return resolve(v.data.data);
        } else if (v.data && !v.data.status) {
          return reject(new Error(v.data.message));
        } else {
          return reject(
            new Error("An unknown error occured, try again later.")
          );
        }
      })
      .catch((err) => {
        console.log("Unable to process your request", err);
        return reject(
          new Error("Unable to process your request, try again later")
        );
      });
  });
};

export default {
  loginUser,
  registerUser,
  getRoomsByOwnerId,
  createNewRoom,
  updateRoom,
  deleteRoomById,
};
