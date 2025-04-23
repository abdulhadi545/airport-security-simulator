
import { Passenger, BaggageItem } from "../models/passenger";

// Queue for passengers (FIFO)
export class PassengerQueue {
  private queue: Passenger[];

  constructor() {
    this.queue = [];
  }

  enqueue(passenger: Passenger): void {
    this.queue.push(passenger);
  }

  dequeue(): Passenger | undefined {
    return this.queue.shift();
  }

  peek(): Passenger | undefined {
    return this.queue.length > 0 ? this.queue[0] : undefined;
  }

  getAll(): Passenger[] {
    return [...this.queue];
  }

  isEmpty(): boolean {
    return this.queue.length === 0;
  }

  getSize(): number {
    return this.queue.length;
  }

  clear(): void {
    this.queue = [];
  }
}

// Stack for baggage items (LIFO)
export class BaggageStack {
  private stack: BaggageItem[];

  constructor() {
    this.stack = [];
  }

  push(item: BaggageItem): void {
    this.stack.push(item);
  }

  pop(): BaggageItem | undefined {
    return this.stack.pop();
  }

  peek(): BaggageItem | undefined {
    return this.stack.length > 0 ? this.stack[this.stack.length - 1] : undefined;
  }

  getAll(): BaggageItem[] {
    return [...this.stack];
  }

  isEmpty(): boolean {
    return this.stack.length === 0;
  }

  getSize(): number {
    return this.stack.length;
  }

  clear(): void {
    this.stack = [];
  }
}

// Node for linked list
class BlacklistNode {
  value: string;
  next: BlacklistNode | null;

  constructor(value: string) {
    this.value = value;
    this.next = null;
  }
}

// Linked list for blacklist
export class BlacklistLinkedList {
  private head: BlacklistNode | null;
  private _size: number;

  constructor() {
    this.head = null;
    this._size = 0;
  }

  add(value: string): void {
    const newNode = new BlacklistNode(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this._size++;
  }

  contains(value: string): boolean {
    let current = this.head;
    while (current) {
      if (current.value === value) {
        return true;
      }
      current = current.next;
    }
    return false;
  }

  toArray(): string[] {
    const result: string[] = [];
    let current = this.head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }

  getSize(): number {
    return this._size;
  }

  clear(): void {
    this.head = null;
    this._size = 0;
  }
}
