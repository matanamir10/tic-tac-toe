import http from "http";
import express from "express";
import path from "path";
import cors from "cors";
import socketIO, { Socket, Server } from "socket.io";
import { Queue } from "../models/Queue";
import { Oponent } from "./Oponent";
import { GameManager } from "./GameManager";
import { AppLogger } from "./Logger";

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

    if (process.env.NODE_ENV === "production") {
      app.use(express.static(path.join(__dirname, "..", "client", "build")));
      app.get("/*", (req, res) => {
        res.sendFile(
          path.join(__dirname, "..", "client", "build", "index.html")
        );
      });
    }

    const server = http.createServer(app);

    ServerSocket.serverSocker = socketIO(server);
    ServerSocket.serverSocker.on("connection", (socket: Socket) => {
      const availeAbleUser = this.usersManager.dequeue();
      const newOponent = new Oponent(socket);

      newOponent.onDisconnect((id: string) => {
        const isRemoved = this.usersManager.remove(id);
        if (isRemoved) {
          AppLogger.getLogger().info(`User ${id} was removed from queue`);
        }
      });

      if (!availeAbleUser) {
        this.usersManager.enqueue(newOponent);
        return;
      }
      new GameManager(availeAbleUser, newOponent);
    });

    const port = process.env.PORT || 4000;
    server.listen(port, () => {
      AppLogger.getLogger().info(`Server listening on ${port}`);
    });
  }
}
