import { describe, expect, it } from "vitest";

import type { BaggageItem, Passenger } from "../models/passenger";
import { BaggageStack, BlacklistLinkedList, PassengerQueue } from "./dataStructures";
import { exportToCsv } from "./simulationUtils";

const passenger = (id: string): Passenger => ({
  id,
  name: `Passenger ${id}`,
  nationality: "Test",
  passportNumber: `P-${id}`,
  flight: "TS100",
  baggage: { id: `B-${id}`, items: [] },
  blacklisted: false,
});

describe("PassengerQueue", () => {
  it("processes passengers in FIFO order without exposing its internal array", () => {
    const queue = new PassengerQueue();
    queue.enqueue(passenger("1"));
    queue.enqueue(passenger("2"));
    const snapshot = queue.getAll();
    snapshot.pop();
    expect(queue.getSize()).toBe(2);
    expect(queue.dequeue()?.id).toBe("1");
    expect(queue.dequeue()?.id).toBe("2");
    expect(queue.isEmpty()).toBe(true);
  });
});

describe("BaggageStack", () => {
  it("scans baggage items in LIFO order", () => {
    const stack = new BaggageStack();
    const safeItem: BaggageItem = { id: "safe", name: "Book", isDangerous: false };
    const flaggedItem: BaggageItem = { id: "flagged", name: "Knife", isDangerous: true };
    stack.push(safeItem);
    stack.push(flaggedItem);
    expect(stack.peek()?.id).toBe("flagged");
    expect(stack.pop()?.id).toBe("flagged");
    expect(stack.pop()?.id).toBe("safe");
  });
});

describe("BlacklistLinkedList", () => {
  it("finds known passports and resets cleanly", () => {
    const blacklist = new BlacklistLinkedList();
    blacklist.add("AB1234567");
    blacklist.add("CD7654321");
    expect(blacklist.contains("CD7654321")).toBe(true);
    expect(blacklist.contains("XX0000000")).toBe(false);
    expect(blacklist.toArray()).toEqual(["AB1234567", "CD7654321"]);
    blacklist.clear();
    expect(blacklist.getSize()).toBe(0);
  });
});

describe("CSV reporting", () => {
  it("exports statistics and event logs", () => {
    const csv = exportToCsv(
      { totalPassengers: 2, alarmedPassengers: 1, clearedPassengers: 1, blacklistMatches: 1 },
      [{ id: "1", timestamp: new Date("2026-01-01T10:00:00Z"), message: "Threat detected", type: "error" }],
    );
    expect(csv).toContain("Total Passengers,2");
    expect(csv).toContain("Blacklist Matches,1");
    expect(csv).toContain('"error","Threat detected"');
  });
});
