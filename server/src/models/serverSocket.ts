// import dotenv from "dotenv";
import http from "http";
import express from "express";
import cors from "cors";
import socketIO, { Socket } from "socket.io";
import { Queue } from "../models/Queue";
import { Oponent } from "./Oponent";
import { GameManager } from "./GameManager";

// const config = dotenv.config();

export class ServerSocket {
  private usersManager: Queue<Oponent>;
  constructor() {
    this.usersManager = new Queue();
  }

  listen(): void {
    console.log("start listenning....");
    //   TODO: use env file
    const app = express();
    app.use(cors());
    const server = http.createServer(app);

    const io = socketIO(server);
    io.on("connection", (socket: Socket) => {
      // If not found usesr waiting no one is available so push him to Queue
      const availeAbleUser = this.usersManager.dequeue();
      if (!availeAbleUser) {
        this.usersManager.enqueue(new Oponent(socket));
      }
      new GameManager(availeAbleUser, new Oponent(socket));
    });

    server.listen(4000);
  }
}
