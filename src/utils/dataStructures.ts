
// Implementation of core data structures used in the simulation
// تنفيذ هياكل البيانات الأساسية المستخدمة في المحاكاة

import { Passenger, BaggageItem } from "../models/passenger";

// Queue implementation for passenger processing (FIFO)
// تنفيذ الطابور لمعالجة المسافرين (الأول في الأول خارج)
export class PassengerQueue {
  private queue: Passenger[];  // Internal queue array | مصفوفة الطابور الداخلية

  constructor() {
    this.queue = [];
  }

  // Add passenger to queue | إضافة مسافر إلى الطابور
  enqueue(passenger: Passenger): void {
    this.queue.push(passenger);
  }

  // Remove and return first passenger | إزالة وإرجاع أول مسافر
  dequeue(): Passenger | undefined {
    return this.queue.shift();
  }

  // View first passenger without removing | عرض أول مسافر بدون إزالة
  peek(): Passenger | undefined {
    return this.queue.length > 0 ? this.queue[0] : undefined;
  }

  // Get all passengers in queue | الحصول على جميع المسافرين في الطابور
  getAll(): Passenger[] {
    return [...this.queue];
  }

  // Check if queue is empty | التحقق مما إذا كان الطابور فارغاً
  isEmpty(): boolean {
    return this.queue.length === 0;
  }

  // Get number of passengers in queue | الحصول على عدد المسافرين في الطابور
  getSize(): number {
    return this.queue.length;
  }

  // Clear all passengers from queue | مسح جميع المسافرين من الطابور
  clear(): void {
    this.queue = [];
  }
}

// Stack implementation for baggage items (LIFO)
// تنفيذ المكدس لعناصر الأمتعة (الأخير في الأول خارج)
export class BaggageStack {
  private stack: BaggageItem[];  // Internal stack array | مصفوفة المكدس الداخلية

  constructor() {
    this.stack = [];
  }

  // Add item to top of stack | إضافة عنصر إلى أعلى المكدس
  push(item: BaggageItem): void {
    this.stack.push(item);
  }

  // Remove and return top item | إزالة وإرجاع العنصر الأعلى
  pop(): BaggageItem | undefined {
    return this.stack.pop();
  }

  // View top item without removing | عرض العنصر الأعلى بدون إزالة
  peek(): BaggageItem | undefined {
    return this.stack.length > 0 ? this.stack[this.stack.length - 1] : undefined;
  }

  // Get all items in stack | الحصول على جميع العناصر في المكدس
  getAll(): BaggageItem[] {
    return [...this.stack];
  }

  // Check if stack is empty | التحقق مما إذا كان المكدس فارغاً
  isEmpty(): boolean {
    return this.stack.length === 0;
  }

  // Get number of items in stack | الحصول على عدد العناصر في المكدس
  getSize(): number {
    return this.stack.length;
  }

  // Clear all items from stack | مسح جميع العناصر من المكدس
  clear(): void {
    this.stack = [];
  }
}

// Node class for linked list implementation
// فئة العقدة لتنفيذ القائمة المتسلسلة
class BlacklistNode {
  value: string;                 // Passport number | رقم جواز السفر
  next: BlacklistNode | null;    // Reference to next node | إشارة إلى العقدة التالية

  constructor(value: string) {
    this.value = value;
    this.next = null;
  }
}

// Linked list implementation for blacklist
// تنفيذ القائمة المتسلسلة للقائمة السوداء
export class BlacklistLinkedList {
  private head: BlacklistNode | null;  // First node in list | العقدة الأولى في القائمة
  private _size: number;               // Number of nodes | عدد العقد

  constructor() {
    this.head = null;
    this._size = 0;
  }

  // Add passport to blacklist | إضافة جواز سفر إلى القائمة السوداء
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

  // Check if passport is in blacklist | التحقق مما إذا كان جواز السفر في القائمة السوداء
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

  // Convert list to array | تحويل القائمة إلى مصفوفة
  toArray(): string[] {
    const result: string[] = [];
    let current = this.head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }

  // Get number of passports in blacklist | الحصول على عدد جوازات السفر في القائمة السوداء
  getSize(): number {
    return this._size;
  }

  // Clear all passports from blacklist | مسح جميع جوازات السفر من القائمة السوداء
  clear(): void {
    this.head = null;
    this._size = 0;
  }
}
