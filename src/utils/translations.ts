// Dynamic translations for UI elements
// الترجمات الديناميكية لعناصر واجهة المستخدم

type TranslationKey =
  // Panel titles
  | 'panel.queue'
  | 'panel.stack'
  | 'panel.blacklist'
  | 'panel.logs'
  | 'panel.controls'
  
  // Button labels
  | 'button.loadData'
  | 'button.newPassenger'
  | 'button.startSimulation'
  | 'button.exportReport'
  
  // Status messages
  | 'status.next'
  | 'status.top'
  | 'status.checking'
  | 'status.dangerous'
  | 'status.safe'
  | 'status.noPassengers'
  | 'status.noItems'
  | 'status.noBlacklist'
  | 'status.noLogs'
  
  // Statistics
  | 'stats.totalPassengers'
  | 'stats.alarmedPassengers'
  | 'stats.clearedPassengers'
  | 'stats.blacklistMatches'
  
  // Simulator header
  | 'simulator.title'
  | 'simulator.description'
  | 'simulator.liveStatus'
  
  // Additional UI text
  | 'ui.flight'
  | 'ui.passport'
  | 'ui.nationality'
  | 'ui.statistics'
  | 'ui.itemNumber';

const translations: Record<TranslationKey, { en: string; ar: string }> = {
  // Panel titles
  'panel.queue': {
    en: 'Passenger Queue',
    ar: 'قائمة انتظار المسافرين'
  },
  'panel.stack': {
    en: 'Baggage Stack',
    ar: 'مجموعة الأمتعة'
  },
  'panel.blacklist': {
    en: 'Passport Blacklist',
    ar: 'القائمة السوداء لجوازات السفر'
  },
  'panel.logs': {
    en: 'System Logs',
    ar: 'سجلات النظام'
  },
  'panel.controls': {
    en: 'Control Panel',
    ar: 'لوحة التحكم'
  },
  
  // Button labels
  'button.loadData': {
    en: 'Load Sample Data',
    ar: 'تحميل البيانات التجريبية'
  },
  'button.newPassenger': {
    en: 'Add Passenger',
    ar: 'إضافة مسافر'
  },
  'button.startSimulation': {
    en: 'Process Next Passenger',
    ar: 'معالجة المسافر التالي'
  },
  'button.exportReport': {
    en: 'Export Report',
    ar: 'تصدير التقرير'
  },
  
  // Status messages
  'status.next': {
    en: 'Next',
    ar: 'التالي'
  },
  'status.top': {
    en: 'Top',
    ar: 'الأعلى'
  },
  'status.checking': {
    en: 'Checking',
    ar: 'جارٍ الفحص'
  },
  'status.dangerous': {
    en: 'DANGEROUS',
    ar: 'خطير'
  },
  'status.safe': {
    en: 'Safe',
    ar: 'آمن'
  },
  'status.noPassengers': {
    en: 'No passengers in queue',
    ar: 'لا يوجد مسافرين في قائمة الانتظار'
  },
  'status.noItems': {
    en: 'No items to display',
    ar: 'لا توجد عناصر للعرض'
  },
  'status.noBlacklist': {
    en: 'No blacklisted passports',
    ar: 'لا توجد جوازات سفر في القائمة السوداء'
  },
  'status.noLogs': {
    en: 'No system logs to display',
    ar: 'لا توجد سجلات نظام للعرض'
  },
  
  // Statistics
  'stats.totalPassengers': {
    en: 'Total Passengers',
    ar: 'إجمالي المسافرين'
  },
  'stats.alarmedPassengers': {
    en: 'Alarmed',
    ar: 'تنبيهات'
  },
  'stats.clearedPassengers': {
    en: 'Cleared',
    ar: 'مصرح لهم'
  },
  'stats.blacklistMatches': {
    en: 'Blacklist Hits',
    ar: 'تطابقات القائمة السوداء'
  },

  // Simulator header
  'simulator.title': {
    en: 'Airport Security Simulator',
    ar: 'محاكي أمن المطار'
  },
  'simulator.description': {
    en: 'Data Structures Visualization',
    ar: 'تصور هياكل البيانات'
  },
  'simulator.liveStatus': {
    en: 'Live',
    ar: 'مباشر'
  },

  // Additional UI text
  'ui.flight': {
    en: 'Flight',
    ar: 'رحلة'
  },
  'ui.passport': {
    en: 'Passport',
    ar: 'جواز سفر'
  },
  'ui.nationality': {
    en: 'Nationality',
    ar: 'الجنسية'
  },
  'ui.statistics': {
    en: 'Statistics',
    ar: 'الإحصائيات'
  },
  'ui.itemNumber': {
    en: 'Item #',
    ar: 'عنصر رقم'
  }
};

// Get translation for a key based on current language
// الحصول على الترجمة لمفتاح معين بناءً على اللغة الحالية
export function getTranslation(key: TranslationKey): string {
  // Currently hardcoded to English, but could be made dynamic
  // حاليًا مضبوط على اللغة الإنجليزية، ولكن يمكن جعله ديناميكيًا
  const language = 'en';
  return translations[key][language as keyof typeof translations[typeof key]];
}
