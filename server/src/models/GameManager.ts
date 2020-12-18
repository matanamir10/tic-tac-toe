import { IDisposeable } from "../interfaces/IDisposeable";
import { Oponent } from "./Oponent";

export class GameManager implements IDisposeable {
  constructor(private oponentOne: Oponent, private oponentTwo: Oponent) {
    console.log("in game manager");
    this.oponentOne.socket.join(this.oponentTwo.socket.id);
    this.oponentTwo.socket.join(this.oponentOne.socket.id);
  }

  start(): void {}

  dispose(): void {
    this.oponentOne.dispose();
    this.oponentTwo.dispose();
  }
}
