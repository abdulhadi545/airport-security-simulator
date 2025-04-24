
// Utility types and functions for the airport security simulation
// الأنواع والوظائف المساعدة لمحاكاة أمن المطار

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
