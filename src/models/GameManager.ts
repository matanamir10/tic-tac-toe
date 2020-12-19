import { Player } from "./../enums/Player";
import { v4 as uuid } from "uuid";
import { Oponent } from "./Oponent";
import { ServerSocket } from "./serverSocket";

export class GameManager {
  private gameId: string;

  constructor(private oponentOne: Oponent, private oponentTwo: Oponent) {
    this.gameId = uuid();
    this.oponentOne._socket.join([this.gameId, this.oponentTwo._socket.id]);
    this.oponentTwo._socket.join([this.gameId, this.oponentOne._socket.id]);
    this.start();
  }

  start(): void {
    ServerSocket.io.to(this.gameId).emit("game", "Game is stating...");
    this.oponentOne.play(Player.X, this.oponentTwo, true);
    this.oponentTwo.play(Player.O, this.oponentOne);
  }
}
