
// Data models for passengers and baggage in the security system
// نماذج البيانات للمسافرين والأمتعة في نظام الأمن

export interface Passenger {
  id: string;                // Unique passenger ID | معرف المسافر الفريد
  name: string;              // Passenger name | اسم المسافر
  nationality: string;       // Passenger nationality | جنسية المسافر
  passportNumber: string;    // Passport number | رقم جواز السفر
  flight: string;           // Flight number | رقم الرحلة
  baggage: Baggage;         // Passenger's baggage | أمتعة المسافر
  blacklisted: boolean;     // Blacklist status | حالة القائمة السوداء
}

export interface Baggage {
  id: string;              // Baggage ID | معرف الأمتعة
  items: BaggageItem[];    // List of items | قائمة المحتويات
}

export interface BaggageItem {
  id: string;              // Item ID | معرف العنصر
  name: string;            // Item name | اسم العنصر
  isDangerous: boolean;    // Dangerous item flag | علامة العنصر الخطير
}

// Predefined lists for simulation data
// قوائم محددة مسبقاً لبيانات المحاكاة

export const DANGEROUS_ITEMS = [
  "Knife",            // سكين
  "Gun",              // مسدس
  "Explosives",       // متفجرات
  "Flammable Liquid", // سائل قابل للاشتعال
  "Cutting Tool"      // أداة قطع
];

export const NATIONALITIES = [
  "Turkish", "American", "British", "German", "French", 
  "Italian", "Russian", "Chinese", "Japanese", "Indian",
  "Brazilian", "Mexican", "Canadian", "Australian", "Egyptian"
];

export const COMMON_ITEMS = [
  "Clothes",     // ملابس
  "Book",        // كتاب
  "Laptop",      // حاسوب محمول
  "Phone",       // هاتف
  "Headphones",  // سماعات
  "Camera",      // كاميرا
  "Toothbrush",  // فرشاة أسنان
  "Shampoo",     // شامبو
  "Wallet",      // محفظة
  "Charger"      // شاحن
];

export const FLIGHTS = [
  "TK1234", "BA2345", "LH3456", "AF4567", "EK5678",
  "QR6789", "SQ7890", "UA8901", "AA9012", "DL0123"
];
