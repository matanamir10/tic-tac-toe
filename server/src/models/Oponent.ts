import { Socket } from "socket.io";
import { IDisposeable } from "../interfaces/IDisposeable";

export class Oponent implements IDisposeable {
  constructor(private _socket: Socket) {}

  get socket(): Socket {
    if (!this._socket.connected) {
      throw new Error("Socket is not connected");
    }
    return this.socket;
  }

  dispose(): void {
    this.socket.disconnect();
  }
}
