import { Socket } from "socket.io";
import { IDisposeable } from "../interfaces/IDisposeable";

export class Oponent implements IDisposeable {
  id: string;
  constructor(private _socket: Socket) {
    this.id = "";
  }

  get socket(): Socket {
    // if (!this._socket.connected) {
    //   throw new Error("Socket is not connected");
    // }
    return this._socket;
  }

  onDisconnect(func: (id: string) => void): void {
    this.socket.on("disconnect", func.bind(null, this.id));
  }
  dispose(): void {
    this.socket.disconnect();
  }
}
