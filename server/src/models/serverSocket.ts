// import dotenv from "dotenv";
import http from "http";
import express from "express";
import cors from "cors";
import socketIO, { Socket, Server } from "socket.io";
import colors from "colors";
import { Queue } from "../models/Queue";
import { Oponent } from "./Oponent";
import { GameManager } from "./GameManager";

// const config = dotenv.config();

export class ServerSocket {
  private static serverSocker: Server;
  private usersManager: Queue<Oponent>;

  constructor() {
    this.usersManager = new Queue();
  }

  static get io(): Server {
    if (!ServerSocket.serverSocker) {
      throw new Error("Server Socekt is not defined");
    }
    return ServerSocket.serverSocker;
  }

  listen(): void {
    const app = express();
    app.use(cors());
    const server = http.createServer(app);

    ServerSocket.serverSocker = socketIO(server);
    ServerSocket.serverSocker.on("connection", (socket: Socket) => {
      console.log(colors.blue.inverse("new connection"));
      console.log(socket.id, socket.connected);
      socket.on("matan", (data) => console.log(data));
      // If not found usesr waiting no one is available so push him to Queue
      const availeAbleUser = this.usersManager.dequeue();
      const newOponent = new Oponent(socket);
      newOponent.onDisconnect((id: string) => {
        const isRemoved = this.usersManager.remove(id);
        console.log("is Removed", isRemoved);
      });
      if (!availeAbleUser) {
        this.usersManager.enqueue(newOponent);
        console.log("size", this.usersManager.size());
        return;
      }
      new GameManager(availeAbleUser, newOponent);
    });

    server.listen(4000, () => {
      console.log("Server listening on port 4000");
    });
  }
}
