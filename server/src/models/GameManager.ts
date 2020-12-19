import { v4 as uuid } from "uuid";
import { Player } from "./../enums/Player";
import { Oponent } from "./Oponent";
import { ServerSocket } from "./serverSocket";

export class GameManager {
  private gameId: string;
  private isGmaeLive: boolean = true;

  constructor(private oponentOne: Oponent, private oponentTwo: Oponent) {
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
        this.isGmaeLive = false;
        this.oponentOne.dispose();
      });

      this.oponentOne.socket.on("disconnect", () => {
        if (this.isGmaeLive) {
          this.oponentTwo.socket.emit("leave");
        }
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
        this.isGmaeLive = false;
        this.oponentTwo.dispose();
      });

      this.oponentTwo.socket.on("disconnect", () => {
        console.log("Is gmae live ", this.isGmaeLive);
        if (this.isGmaeLive) {
          this.oponentOne.socket.emit("leave");
        }
      });
    });
  }
}
