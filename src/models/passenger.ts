
export interface Passenger {
  id: string;
  name: string;
  nationality: string;
  passportNumber: string;
  flight: string;
  baggage: Baggage;
  blacklisted: boolean;
}

export interface Baggage {
  id: string;
  items: BaggageItem[];
}

export interface BaggageItem {
  id: string;
  name: string;
  isDangerous: boolean;
}

export const DANGEROUS_ITEMS = [
  "Knife",
  "Gun",
  "Explosives",
  "Flammable Liquid",
  "Cutting Tool"
];

export const NATIONALITIES = [
  "Turkish", "American", "British", "German", "French", 
  "Italian", "Russian", "Chinese", "Japanese", "Indian",
  "Brazilian", "Mexican", "Canadian", "Australian", "Egyptian"
];

export const COMMON_ITEMS = [
  "Clothes", "Book", "Laptop", "Phone", "Headphones",
  "Camera", "Toothbrush", "Shampoo", "Wallet", "Charger",
  "Umbrella", "Sunglasses", "Medication", "Watch", "Hat"
];

export const FLIGHTS = [
  "TK1234", "BA2345", "LH3456", "AF4567", "EK5678",
  "QR6789", "SQ7890", "UA8901", "AA9012", "DL0123"
];
