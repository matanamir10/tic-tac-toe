import { Socket } from "socket.io";

export class User {
  constructor(private socket: Socket) {
    this.init();
  }

  private init(): void {
    this.socket.join(this.socket.id);
  }
}
