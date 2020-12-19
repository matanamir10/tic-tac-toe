import colors from "colors";
import { v4 as uuid } from "uuid";
import { Player } from "./../enums/Player";
import { IDisposeable } from "../interfaces/IDisposeable";
import { Oponent } from "./Oponent";
import { ServerSocket } from "./serverSocket";

export class GameManager implements IDisposeable {
  private gameId: string;

  constructor(private oponentOne: Oponent, private oponentTwo: Oponent) {
    console.log(colors.red('"in game manager"'));
    this.gameId = uuid();
    this.oponentOne.socket.join([this.gameId, this.oponentTwo.socket.id]);
    this.oponentTwo.socket.join([this.gameId, this.oponentOne.socket.id]);
    this.start();
  }

  start(): void {
    ServerSocket.io.to(this.gameId).emit("game", "Game is stating...");

    this.oponentOne.socket.on("ready", () => {
      this.oponentOne.socket.emit("player", Player.X);
      this.oponentOne.socket.emit("act");
      this.oponentOne.socket.on("move", (move) => {
        this.oponentTwo.socket.emit("updateBoard", {
          index: move,
          player: Player.X,
        });
        this.oponentTwo.socket.emit("act");
      });

      this.oponentOne.socket.on("endGame", () => {
        this.dispose();
      });

      this.oponentOne.socket.on("disconnect", () => {
        this.oponentTwo.socket.emit("leave");
      });
    });

    this.oponentTwo.socket.on("ready", () => {
      this.oponentTwo.socket.emit("player", Player.O);
      this.oponentTwo.socket.on("move", (move) => {
        this.oponentOne.socket.emit("updateBoard", {
          index: move,
          player: Player.O,
        });

        this.oponentOne.socket.emit("act");
      });

      this.oponentTwo.socket.on("endGame", () => {
        this.dispose();
      });

      this.oponentTwo.socket.on("disconnect", () => {
        this.oponentOne.socket.emit("leave");
      });
    });
  }

  dispose(): void {
    console.log(colors.green("Disposing..."));
    this.oponentOne.dispose();
    this.oponentTwo.dispose();
  }
}
