import io from "socket.io-client";

let socket = null;

const socketConnection = {
  connect() {
    socket = io("http://localhost:4000");
  },
  getSocket() {
    if (!socket) {
      throw new Error("socket must be defined");
    }
    return socket;
  },
};

export default socketConnection;
