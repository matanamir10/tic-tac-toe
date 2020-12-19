import { IPrintable } from "../interfaces/IPrintable";
import { IQueue } from "../interfaces/IQueue";

interface QueueItem {
  id: string;
}

export class Queue<T extends QueueItem> implements IQueue<T>, IPrintable {
  private storage: T[] = [];

  constructor(private capacity: number = Infinity) {}

  enqueue(item: T): void {
    if (this.size() === this.capacity) {
      throw Error("Queue has reached max capacity, you cannot add more items");
    }
    this.storage.push(item);
  }

  dequeue(): T | undefined {
    return this.storage.shift();
  }

  remove(id: string): boolean {
    const index = this.storage.findIndex((item) => item.id === id);
    if (index === -1) {
      return false;
    }
    return true;
  }

  size(): number {
    return this.storage.length;
  }

  print(): void {
    for (const item of this.storage) {
      console.log(item);
    }
  }
}
