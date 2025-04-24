type Translation = {
  en: string;
  ar: string;
};

export const translations: Record<string, Translation> = {
  // Header translations
  'simulator.title': {
    en: 'Airport Baggage Security Simulator',
    ar: 'محاكي أمن أمتعة المطار'
  },
  'simulator.description': {
    en: 'Interactive simulation of airport security checkpoint',
    ar: 'محاكاة تفاعلية لنقطة التفتيش الأمني بالمطار'
  },
  'simulator.liveStatus': {
    en: 'Live Simulation',
    ar: 'محاكاة مباشرة'
  },

  // Panel translations with detailed Arabic explanations
  'panel.blacklist': {
    en: 'Blacklist (Linked List)',
    ar: 'القائمة السوداء (قائمة متسلسلة)'  // Blacklist implemented as a linked list data structure
  },
  'panel.queue': {
    en: 'Queue Panel (FIFO)',
    ar: 'لوحة الطابور (الأول يخرج أولاً)'  // Queue panel using First-In-First-Out principle
  },
  'panel.stack': {
    en: 'Stack Panel (LIFO)',
    ar: 'لوحة المكدس (الآخر يخرج أولاً)'  // Stack panel using Last-In-First-Out principle
  },
  'panel.logs': {
    en: 'Log Panel',
    ar: 'لوحة السجلات'  // Panel showing system logs and events
  },
  'panel.controls': {
    en: 'Control Panel',
    ar: 'لوحة التحكم'  // Panel for simulation controls
  },

  // Button translations
  'button.loadData': {
    en: 'Load Data',
    ar: 'تحميل البيانات'
  },
  'button.newPassenger': {
    en: 'New Passenger',
    ar: 'مسافر جديد'
  },
  'button.startSimulation': {
    en: 'Start Simulation',
    ar: 'بدء المحاكاة'
  },
  'button.exportReport': {
    en: 'Export Report',
    ar: 'تصدير التقرير'
  },

  // Status translations with Arabic explanations
  'status.checking': {
    en: 'Checking',
    ar: 'جاري الفحص'  // Currently being checked/verified
  },
  'status.next': {
    en: 'Next',
    ar: 'التالي'  // Next item in sequence
  },
  'status.dangerous': {
    en: 'DANGEROUS',
    ar: 'خطير'  // Marked as dangerous item
  },
  'status.safe': {
    en: 'SAFE',
    ar: 'آمن'  // Marked as safe item
  },
  'status.top': {
    en: 'Top',
    ar: 'أعلى المكدس'  // Top of the stack
  },
  'status.noBlacklist': {
    en: 'No blacklisted passports',
    ar: 'لا توجد جوازات سفر في القائمة السوداء'  // No passports in blacklist
  },
  'status.noLogs': {
    en: 'No logs yet',
    ar: 'لا توجد سجلات حتى الآن'  // No system logs available yet
  },

  // Stats translations
  'stats.totalPassengers': {
    en: 'Total Passengers',
    ar: 'إجمالي المسافرين'
  },
  'stats.alarmedPassengers': {
    en: 'Alarmed Passengers',
    ar: 'المسافرون المنذرون'
  },
  'stats.clearedPassengers': {
    en: 'Cleared Passengers',
    ar: 'المسافرون المصرح لهم'
  },
  'stats.blacklistMatches': {
    en: 'Blacklist Matches',
    ar: 'مطابقات القائمة السوداء'
  },
};

export function getTranslation(key: string): string {
  const translation = translations[key];
  if (!translation) {
    console.warn(`Translation missing for key: ${key}`);
    return key;
  }
  return `${translation.en} / ${translation.ar}`;
}
