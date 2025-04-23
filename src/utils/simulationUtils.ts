
import { v4 as uuidv4 } from 'uuid';
import { 
  Passenger, 
  Baggage, 
  BaggageItem, 
  DANGEROUS_ITEMS, 
  COMMON_ITEMS, 
  NATIONALITIES,
  FLIGHTS 
} from '../models/passenger';
import { PassengerQueue, BaggageStack, BlacklistLinkedList } from './dataStructures';

export interface SimulationLog {
  id: string;
  timestamp: Date;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
}

export interface SimulationStats {
  totalPassengers: number;
  alarmedPassengers: number;
  clearedPassengers: number;
  blacklistMatches: number;
}

// Generate a random name
export function generateRandomName(): string {
  const firstNames = [
    "Ali", "Ayse", "Mehmet", "Fatma", "Ahmet", "Zeynep", "Mustafa", "Emine", 
    "Ibrahim", "Hatice", "Hasan", "Elif", "Hüseyin", "Merve", "Osman", "Esra"
  ];
  
  const lastNames = [
    "Yilmaz", "Kaya", "Demir", "Celik", "Sahin", "Yildiz", "Arslan", 
    "Koc", "Kurt", "Ozturk", "Aydin", "Ozdemir", "Aslan", "Ceylan"
  ];
  
  const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  return `${randomFirstName} ${randomLastName}`;
}

// Generate a random passport number
export function generateRandomPassportNumber(): string {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetter1 = letters[Math.floor(Math.random() * letters.length)];
  const randomLetter2 = letters[Math.floor(Math.random() * letters.length)];
  const randomNumbers = Math.floor(1000000 + Math.random() * 9000000);
  
  return `${randomLetter1}${randomLetter2}${randomNumbers}`;
}

// Check if an item is dangerous
export function isDangerousItem(itemName: string): boolean {
  return DANGEROUS_ITEMS.includes(itemName);
}

// Generate a random baggage item
export function generateRandomBaggageItem(): BaggageItem {
  const isDangerous = Math.random() < 0.1; // 10% chance to be dangerous
  const itemName = isDangerous ? 
    DANGEROUS_ITEMS[Math.floor(Math.random() * DANGEROUS_ITEMS.length)] : 
    COMMON_ITEMS[Math.floor(Math.random() * COMMON_ITEMS.length)];

  return {
    id: uuidv4(),
    name: itemName,
    isDangerous
  };
}

// Generate random baggage with items
export function generateRandomBaggage(): Baggage {
  const itemCount = Math.floor(Math.random() * 5) + 2; // 2-6 items
  const items: BaggageItem[] = [];
  
  for (let i = 0; i < itemCount; i++) {
    items.push(generateRandomBaggageItem());
  }
  
  return {
    id: uuidv4(),
    items
  };
}

// Create a new random passenger
export function createRandomPassenger(blacklisted: boolean = false): Passenger {
  const name = generateRandomName();
  const nationality = NATIONALITIES[Math.floor(Math.random() * NATIONALITIES.length)];
  const passportNumber = generateRandomPassportNumber();
  const flight = FLIGHTS[Math.floor(Math.random() * FLIGHTS.length)];
  const baggage = generateRandomBaggage();
  
  return {
    id: uuidv4(),
    name,
    nationality,
    passportNumber,
    flight,
    baggage,
    blacklisted
  };
}

// Generate initial blacklist
export function generateInitialBlacklist(): string[] {
  const blacklistedPassports: string[] = [];
  const count = Math.floor(Math.random() * 10) + 5; // 5-14 blacklisted passports
  
  for (let i = 0; i < count; i++) {
    blacklistedPassports.push(generateRandomPassportNumber());
  }
  
  return blacklistedPassports;
}

// Generate a random set of passengers
export function generateRandomPassengers(count: number, blacklist: string[]): Passenger[] {
  const passengers: Passenger[] = [];
  
  for (let i = 0; i < count; i++) {
    const passenger = createRandomPassenger();
    
    // Small chance that passenger has a blacklisted passport
    if (Math.random() < 0.15) { // 15% chance
      passenger.passportNumber = blacklist[Math.floor(Math.random() * blacklist.length)];
      passenger.blacklisted = true;
    }
    
    passengers.push(passenger);
  }
  
  return passengers;
}

// Export data to CSV format
export function exportToCsv(stats: SimulationStats, logs: SimulationLog[]): string {
  const statsData = `Simulation Statistics\nTotal Passengers,${stats.totalPassengers}\nAlarmed Passengers,${stats.alarmedPassengers}\nCleared Passengers,${stats.clearedPassengers}\nBlacklist Matches,${stats.blacklistMatches}\n\n`;
  
  const logHeaders = 'Timestamp,Message,Type\n';
  const logData = logs.map(log => 
    `${log.timestamp.toLocaleString()},"${log.message}",${log.type}`
  ).join('\n');
  
  return statsData + logHeaders + logData;
}

// Helper to download CSV file
export function downloadCsv(csvContent: string, fileName: string): void {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
