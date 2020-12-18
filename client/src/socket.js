import io from "socket.io-client";

let socket = null;

const socketConnection = {
  connect() {
    if (socket) {
      return;
    }
    socket = io("http://localhost:4000", {
      reconnection: false,
      transports: ["websocket"],
    });
  },
  getSocket() {
    if (!socket) {
      throw new Error("socket must be defined");
    }
    return socket;
  },
};

export default socketConnection;
