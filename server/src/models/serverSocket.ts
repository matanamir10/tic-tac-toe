import dotenv from "dotenv";
import http from "http";
import express from "express";
import socketIo from "socket.io";

// const config = dotenv.config();

export class ServerSocket {
  constructor() {
    this.init();
  }

  private init(): void {
    //   TODO: use env file
    const app = express();
    app.set("port", 4000);

    const server = new http.Server(app);
  }

  listen(): void {
    console.log("start listenning....");
    const io = socketIo(http);
    io.on("connection", (socket: SocketIO.Socket) => {
      console.log(socket.id);
    });
  }
}
