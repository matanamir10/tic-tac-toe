import { v4 as uuid } from "uuid";
import { IDisposeable } from "../interfaces/IDisposeable";
import { Oponent } from "./Oponent";
import { ServerSocket } from "./serverSocket";

export class GameManager implements IDisposeable {
  private gameId: string;

  constructor(private oponentOne: Oponent, private oponentTwo: Oponent) {
    console.log("in game manager");
    this.gameId = uuid();
    this.oponentOne.socket.join([this.gameId, this.oponentTwo.socket.id]);
    this.oponentTwo.socket.join([this.gameId, this.oponentOne.socket.id]);
    this.start();
  }

  start(): void {
    ServerSocket.io.to(this.gameId).emit("game", "Game is stating...");
    this.oponentOne.socket.on("move", (move) => {});

    this.oponentTwo.socket.on("move", (move) => {});
    // this.oponentOne.socket
    //   .to(this.oponentTwo.socket.id)
    //   .emit("game", {

    //   });
  }

  dispose(): void {
    this.oponentOne.dispose();
    this.oponentTwo.dispose();
  }
}
