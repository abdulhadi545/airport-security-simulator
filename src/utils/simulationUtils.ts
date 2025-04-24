
// Utility types and functions for the airport security simulation
// الأنواع والوظائف المساعدة لمحاكاة أمن المطار

import { v4 as uuidv4 } from 'uuid';
import { 
  Passenger, 
  Baggage, 
  BaggageItem, 
  DANGEROUS_ITEMS, 
  COMMON_ITEMS, 
  NATIONALITIES, 
  FLIGHTS 
} from '@/models/passenger';

export interface SimulationLog {
  id: string;           // Unique identifier | معرف فريد
  timestamp: Date;      // When the event occurred | وقت حدوث الحدث
  message: string;      // Log message content | محتوى رسالة السجل
  type: 'info' | 'warning' | 'error' | 'success';  // Log type | نوع السجل
}

export interface SimulationStats {
  totalPassengers: number;      // Total processed passengers | إجمالي المسافرين المعالجين
  alarmedPassengers: number;    // Passengers that triggered alarms | المسافرين الذين أطلقوا الإنذارات
  clearedPassengers: number;    // Successfully cleared passengers | المسافرين المصرح لهم
  blacklistMatches: number;     // Matches found in blacklist | التطابقات في القائمة السوداء
}

// Helper functions for simulation logic
// وظائف مساعدة لمنطق المحاكاة

export const createLog = (
  message: string, 
  type: SimulationLog['type'] = 'info'
): SimulationLog => ({
  id: Math.random().toString(36).substring(7),
  timestamp: new Date(),
  message,
  type
});

export const initialStats: SimulationStats = {
  totalPassengers: 0,
  alarmedPassengers: 0,
  clearedPassengers: 0,
  blacklistMatches: 0
};

// Generate random items for baggage
// توليد عناصر عشوائية للأمتعة
const generateRandomItems = (count: number): BaggageItem[] => {
  const items: BaggageItem[] = [];
  
  // Always include 1-3 common items
  // دائمًا تضمين 1-3 عناصر شائعة
  const commonItemCount = Math.floor(Math.random() * 3) + 1;
  for (let i = 0; i < commonItemCount; i++) {
    const randomItem = COMMON_ITEMS[Math.floor(Math.random() * COMMON_ITEMS.length)];
    items.push({
      id: uuidv4(),
      name: randomItem,
      isDangerous: false
    });
  }
  
  // Small chance to include a dangerous item (15%)
  // فرصة صغيرة لتضمين عنصر خطير (15%)
  if (Math.random() < 0.15) {
    const randomDangerousItem = DANGEROUS_ITEMS[Math.floor(Math.random() * DANGEROUS_ITEMS.length)];
    items.push({
      id: uuidv4(),
      name: randomDangerousItem,
      isDangerous: true
    });
  }
  
  return items;
};

// Create a random passenger
// إنشاء مسافر عشوائي
export const createRandomPassenger = (): Passenger => {
  // Create random first and last names
  // إنشاء أسماء عشوائية
  const firstNames = ['Ali', 'Mohammed', 'Sarah', 'Ahmed', 'Fatima', 'John', 'Maria', 'Yusuf', 'Aisha', 'David'];
  const lastNames = ['Smith', 'Khan', 'Al-Farsi', 'Johnson', 'Lee', 'Wang', 'Garcia', 'Hassan', 'Ahmed', 'Patel'];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const fullName = `${firstName} ${lastName}`;
  
  // Generate random passport number
  // توليد رقم جواز سفر عشوائي
  const passportNumber = `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`;
  
  // Select random nationality and flight
  // اختيار جنسية ورحلة عشوائية
  const nationality = NATIONALITIES[Math.floor(Math.random() * NATIONALITIES.length)];
  const flight = FLIGHTS[Math.floor(Math.random() * FLIGHTS.length)];
  
  // Create baggage with random items
  // إنشاء أمتعة بعناصر عشوائية
  const baggage: Baggage = {
    id: uuidv4(),
    items: generateRandomItems(Math.floor(Math.random() * 5) + 1)
  };
  
  return {
    id: uuidv4(),
    name: fullName,
    nationality,
    passportNumber,
    flight,
    baggage,
    blacklisted: false
  };
};

// Generate initial set of blacklisted passport numbers
// توليد مجموعة أولية من أرقام جوازات السفر المدرجة في القائمة السوداء
export const generateInitialBlacklist = (): string[] => {
  const blacklist: string[] = [];
  const blacklistSize = 10;
  
  for (let i = 0; i < blacklistSize; i++) {
    const passportNumber = `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`;
    blacklist.push(passportNumber);
  }
  
  return blacklist;
};

// Generate multiple random passengers
// توليد عدة مسافرين عشوائيين
export const generateRandomPassengers = (count: number, blacklist: string[] = []): Passenger[] => {
  const passengers: Passenger[] = [];
  
  for (let i = 0; i < count; i++) {
    const passenger = createRandomPassenger();
    
    // Small chance (5%) to make this a blacklisted passenger
    // فرصة صغيرة (5%) لجعل هذا مسافر مدرج في القائمة السوداء
    if (Math.random() < 0.05 && blacklist.length > 0) {
      passenger.passportNumber = blacklist[Math.floor(Math.random() * blacklist.length)];
      passenger.blacklisted = true;
    }
    
    passengers.push(passenger);
  }
  
  return passengers;
};

// Export data to CSV format
// تصدير البيانات إلى تنسيق CSV
export const exportToCsv = (stats: SimulationStats, logs: SimulationLog[]): string => {
  // Create header
  // إنشاء ترويسة
  let csv = 'Airport Security Simulation Report,\n';
  csv += `Date:,${new Date().toLocaleDateString()},\n\n`;
  
  // Add stats section
  // إضافة قسم الإحصائيات
  csv += 'STATISTICS,\n';
  csv += 'Metric,Value,\n';
  csv += `Total Passengers,${stats.totalPassengers},\n`;
  csv += `Alarmed Passengers,${stats.alarmedPassengers},\n`;
  csv += `Cleared Passengers,${stats.clearedPassengers},\n`;
  csv += `Blacklist Matches,${stats.blacklistMatches},\n\n`;
  
  // Add logs section
  // إضافة قسم السجلات
  csv += 'EVENT LOG,\n';
  csv += 'Timestamp,Type,Message,\n';
  
  logs.forEach((log) => {
    csv += `${log.timestamp.toLocaleString()},"${log.type}","${log.message}",\n`;
  });
  
  return csv;
};

// Helper function to download CSV data
// دالة مساعدة لتنزيل بيانات CSV
export const downloadCsv = (csvData: string, filename: string): void => {
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
