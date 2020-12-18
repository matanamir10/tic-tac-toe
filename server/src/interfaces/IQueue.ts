export interface IQueue<T> {
  enqueue(item: T): void;
  dequeue(): T;
  remove(id: string): boolean;
  size(): number;
}
