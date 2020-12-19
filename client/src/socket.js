import io from "socket.io-client";

let url = "/";
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  url = "http://localhost:4000";
}

let socket = null;

const socketConnection = {
  connect() {
    socket = io(url);
  },
  getSocket() {
    if (!socket) {
      throw new Error("socket must be defined");
    }
    return socket;
  },
};

export default socketConnection;
