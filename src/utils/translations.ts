
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

  // Panel translations
  'panel.blacklist': {
    en: 'Blacklist (Linked List)',
    ar: 'القائمة السوداء (قائمة مرتبطة)'
  },
  'panel.queue': {
    en: 'Queue Panel (FIFO)',
    ar: 'لوحة الطابور (الأول يخرج أولاً)'
  },
  'panel.stack': {
    en: 'Stack Panel (LIFO)',
    ar: 'لوحة المكدس (الأخير يخرج أولاً)'
  },
  'panel.logs': {
    en: 'Log Panel',
    ar: 'لوحة السجلات'
  },
  'panel.controls': {
    en: 'Control Panel',
    ar: 'لوحة التحكم'
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

  // Status translations
  'status.checking': {
    en: 'Checking',
    ar: 'جاري الفحص'
  },
  'status.next': {
    en: 'Next',
    ar: 'التالي'
  },
  'status.dangerous': {
    en: 'DANGEROUS',
    ar: 'خطير'
  },
  'status.safe': {
    en: 'SAFE',
    ar: 'آمن'
  },
  'status.top': {
    en: 'Top',
    ar: 'أعلى'
  },
  'status.noBlacklist': {
    en: 'No blacklisted passports',
    ar: 'لا توجد جوازات سفر في القائمة السوداء'
  },
  'status.noLogs': {
    en: 'No logs yet',
    ar: 'لا توجد سجلات بعد'
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
