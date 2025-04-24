
type Translation = {
  en: string;
  ar: string;
};

// تخزين جميع الترجمات للتطبيق
// Store all translations for the application
export const translations: Record<string, Translation> = {
  // ترجمات العنوان - Header translations
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

  // ترجمات اللوحات مع شرح مفصل بالعربية - Panel translations with detailed Arabic explanations
  'panel.blacklist': {
    en: 'Blacklist (Linked List)',
    ar: 'القائمة السوداء (قائمة متسلسلة)'  // هيكل بيانات يستخدم القائمة المتسلسلة - Data structure using linked list
  },
  'panel.queue': {
    en: 'Queue Panel (FIFO)',
    ar: 'لوحة الطابور (الأول يخرج أولاً)'  // نظام الطابور: الأول في الدخول هو الأول في الخروج - First In First Out principle
  },
  'panel.stack': {
    en: 'Stack Panel (LIFO)',
    ar: 'لوحة المكدس (الآخر يخرج أولاً)'  // نظام المكدس: الآخر في الدخول هو الأول في الخروج - Last In First Out principle
  },
  'panel.logs': {
    en: 'Log Panel',
    ar: 'لوحة السجلات'  // لوحة تعرض سجلات وأحداث النظام - Panel showing system events and logs
  },
  'panel.controls': {
    en: 'Control Panel',
    ar: 'لوحة التحكم'  // لوحة للتحكم في المحاكاة - Panel for controlling the simulation
  },

  // ترجمات الأزرار - Button translations
  'button.loadData': {
    en: 'Load Data',
    ar: 'تحميل البيانات'  // زر لتحميل البيانات في النظام - Button to load data into the system
  },
  'button.newPassenger': {
    en: 'New Passenger',
    ar: 'مسافر جديد'  // إضافة مسافر جديد إلى النظام - Add new passenger to the system
  },
  'button.startSimulation': {
    en: 'Start Simulation',
    ar: 'بدء المحاكاة'  // بدء عملية المحاكاة - Start the simulation process
  },
  'button.exportReport': {
    en: 'Export Report',
    ar: 'تصدير التقرير'  // تصدير تقرير بالنتائج - Export results report
  },

  // ترجمات الحالات مع شرح بالعربية - Status translations with Arabic explanations
  'status.checking': {
    en: 'Checking',
    ar: 'جاري الفحص'  // جاري التحقق من العنصر حالياً - Currently verifying the item
  },
  'status.next': {
    en: 'Next',
    ar: 'التالي'  // العنصر التالي في التسلسل - Next item in sequence
  },
  'status.dangerous': {
    en: 'DANGEROUS',
    ar: 'خطير'  // تم تحديد العنصر كخطير - Item marked as dangerous
  },
  'status.safe': {
    en: 'SAFE',
    ar: 'آمن'  // تم تحديد العنصر كآمن - Item marked as safe
  },
  'status.top': {
    en: 'Top',
    ar: 'أعلى المكدس'  // أعلى عنصر في المكدس - Top item in the stack
  },
  'status.noBlacklist': {
    en: 'No blacklisted passports',
    ar: 'لا توجد جوازات سفر في القائمة السوداء'  // لا توجد جوازات سفر محظورة - No forbidden passports
  },
  'status.noLogs': {
    en: 'No logs yet',
    ar: 'لا توجد سجلات حتى الآن'  // لا توجد سجلات متاحة بعد - No logs available yet
  },

  // ترجمات الإحصائيات - Stats translations
  'stats.totalPassengers': {
    en: 'Total Passengers',
    ar: 'إجمالي المسافرين'  // العدد الكلي للمسافرين - Total number of passengers
  },
  'stats.alarmedPassengers': {
    en: 'Alarmed Passengers',
    ar: 'المسافرون المنذرون'  // عدد المسافرين الذين تم إنذارهم - Number of passengers that triggered alarms
  },
  'stats.clearedPassengers': {
    en: 'Cleared Passengers',
    ar: 'المسافرون المصرح لهم'  // عدد المسافرين الذين تم تصريحهم - Number of cleared passengers
  },
  'stats.blacklistMatches': {
    en: 'Blacklist Matches',
    ar: 'مطابقات القائمة السوداء'  // عدد المطابقات مع القائمة السوداء - Number of blacklist matches
  },
};

// دالة للحصول على الترجمة بالإنجليزية والعربية
// Function to get translation in both English and Arabic
export function getTranslation(key: string): string {
  const translation = translations[key];
  if (!translation) {
    console.warn(`Translation missing for key: ${key}`);
    return key;
  }
  return `${translation.en} / ${translation.ar}`;
}

