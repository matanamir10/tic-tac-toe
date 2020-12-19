import { Socket } from "socket.io";
import { IDisposeable } from "../interfaces/IDisposeable";
import { Player } from "./../enums/Player";

export class Oponent implements IDisposeable {
  private isGmaeLive: boolean = true;
  id: string;

  constructor(public _socket: Socket) {
    this.id = this._socket.id;
  }

  play(player: Player, oponent: Oponent, first?: boolean): void {
    this._socket.on("ready", () => {
      this._socket.emit("player", player);

      if (first) {
        this._socket.emit("act");
      }

      this._socket.on("move", (move) => {
        oponent._socket.emit("updateBoard", {
          index: move,
          player: player,
        });
        oponent._socket.emit("act");
      });

      this._socket.on("endGame", () => {
        this.isGmaeLive = false;
        this.dispose();
      });

      this._socket.on("disconnect", () => {
        if (this.isGmaeLive) {
          oponent._socket.emit("leave");
        }
      });
    });
  }

  onDisconnect(func: (id: string) => void): void {
    this._socket.on("disconnect", () => {
      func.bind(null, this.id);
    });
  }

  dispose(): void {
    this._socket.disconnect();
  }
}
