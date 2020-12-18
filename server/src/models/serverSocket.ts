// import dotenv from "dotenv";
import http from "http";
import express from "express";
import cors from "cors";
import socketIO, { Socket } from "socket.io";

// const config = dotenv.config();

export class ServerSocket {
  listen(): void {
    console.log("start listenning....");
    //   TODO: use env file
    const app = express();
    app.use(cors());
    const server = http.createServer(app);

    const io = socketIO(server);
    io.on("connection", (socket: Socket) => {
      console.log(socket.id);
    });

    server.listen(4000);
  }
}
