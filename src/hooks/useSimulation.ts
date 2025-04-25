
import { useState, useCallback } from 'react';
import { toast } from "@/components/ui/use-toast";
import { PassengerQueue, BaggageStack, BlacklistLinkedList } from '@/utils/dataStructures';
import { Passenger, BaggageItem } from '@/models/passenger';
import { 
  SimulationLog, 
  SimulationStats,
  createRandomPassenger,
  generateInitialBlacklist,
  generateRandomPassengers,
  exportToCsv,
  downloadCsv
} from '@/utils/simulationUtils';
import { v4 as uuidv4 } from 'uuid';

// خطاف المحاكاة - يوفر الحالة والوظائف اللازمة للمحاكاة
export const useSimulation = () => {
  // هياكل البيانات
  // استخدام طابور للمسافرين
  const [passengerQueue] = useState<PassengerQueue>(new PassengerQueue());
  // استخدام مكدس للأمتعة
  const [baggageStack] = useState<BaggageStack>(new BaggageStack());
  // استخدام قائمة متسلسلة للقائمة السوداء
  const [blacklistLL] = useState<BlacklistLinkedList>(new BlacklistLinkedList());
  
  // الحالة
  // قائمة المسافرين المعروضة في الواجهة
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  // العناصر الحالية المعروضة في المكدس
  const [currentItems, setCurrentItems] = useState<BaggageItem[]>([]);
  // جوازات السفر المدرجة في القائمة السوداء
  const [blacklistedPassports, setBlacklistedPassports] = useState<string[]>([]);
  // سجلات المحاكاة
  const [logs, setLogs] = useState<SimulationLog[]>([]);
  // إحصائيات المحاكاة
  const [stats, setStats] = useState<SimulationStats>({
    totalPassengers: 0,
    alarmedPassengers: 0,
    clearedPassengers: 0,
    blacklistMatches: 0,
  });
  
  // حالة المحاكاة - تتبع ما إذا كانت المحاكاة قيد التنفيذ
  const [simulationInProgress, setSimulationInProgress] = useState(false);
  // حالة المسح - تتبع ما إذا كان فحص الأمتعة قيد التنفيذ
  const [scanningInProgress, setScanningInProgress] = useState(false);
  // مؤشر العنصر الحالي الذي يتم فحصه
  const [currentItemIndex, setCurrentItemIndex] = useState<number>(-1);
  // رقم جواز السفر الذي يتم فحصه حالياً
  const [currentCheckingPassport, setCurrentCheckingPassport] = useState<string | undefined>(undefined);

  // تهيئة المحاكاة
  const initializeSimulation = useCallback(() => {
    // توليد قائمة سوداء أولية
    const initialBlacklist = generateInitialBlacklist();
    // إضافة جوازات السفر إلى القائمة المتسلسلة
    initialBlacklist.forEach(passport => {
      blacklistLL.add(passport);
    });
    // تحديث حالة جوازات السفر المدرجة في القائمة السوداء
    setBlacklistedPassports(initialBlacklist);
    // إضافة سجلات بدء التشغيل
    addLog("System initialized and ready", "info");
    addLog("Welcome to Airport Baggage Security Simulator", "info");
    addLog("Use control panel to load data or add passengers", "info");
    addLog(`Initialized blacklist with ${initialBlacklist.length} entries`, "info");
  }, [blacklistLL]);

  // دالة مساعدة لإضافة سجلات
  const addLog = useCallback((message: string, type: 'info' | 'warning' | 'error' | 'success') => {
    // إنشاء سجل جديد
    const newLog: SimulationLog = {
      id: uuidv4(),
      timestamp: new Date(),
      message,
      type
    };
    // إضافة السجل إلى قائمة السجلات
    setLogs(prevLogs => [...prevLogs, newLog]);
    
    // إظهار إشعار للأخطاء أو النجاحات
    if (type === 'error' || type === 'success') {
      toast({
        title: type === 'error' ? 'Alert' : 'Success',
        description: message,
        variant: type === 'error' ? 'destructive' : 'default',
      });
    }
  }, []);

  // تحديث حالة المسافرين من الطابور
  const updatePassengersFromQueue = useCallback(() => {
    setPassengers(passengerQueue.getAll());
  }, [passengerQueue]);

  // تحميل بيانات عينة
  const handleLoadData = useCallback(() => {
    // توليد مسافرين عشوائيين
    const newPassengers = generateRandomPassengers(30, blacklistedPassports);
    // إضافة المسافرين إلى الطابور
    newPassengers.forEach(passenger => {
      passengerQueue.enqueue(passenger);
    });
    
    // تحديث واجهة المستخدم
    updatePassengersFromQueue();
    addLog(`Loaded ${newPassengers.length} passengers into the queue`, "success");
    
    // تحديث الإحصائيات
    setStats(prev => ({
      ...prev,
      totalPassengers: prev.totalPassengers + newPassengers.length
    }));
  }, [blacklistedPassports, passengerQueue, updatePassengersFromQueue, addLog]);

  // إضافة مسافر جديد
  const handleNewPassenger = useCallback(() => {
    // إنشاء مسافر عشوائي
    const newPassenger = createRandomPassenger();
    
    // فرصة صغيرة (15%) لجعل المسافر مدرجاً في القائمة السوداء
    if (Math.random() < 0.15 && blacklistedPassports.length > 0) {
      newPassenger.passportNumber = blacklistedPassports[Math.floor(Math.random() * blacklistedPassports.length)];
      newPassenger.blacklisted = true;
    }
    
    // إضافة المسافر إلى الطابور
    passengerQueue.enqueue(newPassenger);
    updatePassengersFromQueue();
    addLog(`Added passenger ${newPassenger.name} to the queue`, "info");
    
    // تحديث الإحصائيات
    setStats(prev => ({
      ...prev,
      totalPassengers: prev.totalPassengers + 1
    }));
  }, [blacklistedPassports, passengerQueue, updatePassengersFromQueue, addLog]);

  // التحقق من القائمة السوداء
  const checkBlacklist = useCallback((passenger: Passenger) => {
    return new Promise<boolean>((resolve) => {
      // تحديث رقم جواز السفر الذي يتم فحصه حالياً
      setCurrentCheckingPassport(passenger.passportNumber);
      
      // محاكاة تأخير الفحص
      setTimeout(() => {
        // التحقق مما إذا كان رقم جواز السفر مدرجاً في القائمة السوداء
        const isBlacklisted = blacklistLL.contains(passenger.passportNumber);
        
        // إذا كان مدرجاً في القائمة السوداء، أضف سجل تحذير وحدّث الإحصائيات
        if (isBlacklisted) {
          addLog(`ALERT: Passenger ${passenger.name} is on the blacklist (Passport: ${passenger.passportNumber})`, "error");
          setStats(prev => ({
            ...prev,
            blacklistMatches: prev.blacklistMatches + 1,
            alarmedPassengers: prev.alarmedPassengers + 1
          }));
        }
        
        // إعادة تعيين رقم جواز السفر الذي يتم فحصه حالياً
        setCurrentCheckingPassport(undefined);
        resolve(isBlacklisted);
      }, 1000);
    });
  }, [blacklistLL, addLog]);

  // فحص الأمتعة
  const scanBaggage = useCallback((items: BaggageItem[]) => {
    return new Promise<boolean>((resolve) => {
      // مسح المكدس وإضافة العناصر الجديدة
      baggageStack.clear();
      items.forEach(item => baggageStack.push(item));
      setCurrentItems(items);
      
      // تعيين حالة المسح إلى "قيد التنفيذ"
      setScanningInProgress(true);
      let currentIndex = 0;
      let foundDangerous = false;
      
      // فحص كل عنصر على التوالي بفاصل زمني
      const scanInterval = setInterval(() => {
        // إذا تم فحص جميع العناصر، أنهِ العملية
        if (currentIndex >= items.length) {
          clearInterval(scanInterval);
          setScanningInProgress(false);
          setCurrentItemIndex(-1);
          
          // تحديث الإحصائيات بناءً على نتيجة الفحص
          if (foundDangerous) {
            setStats(prev => ({
              ...prev,
              alarmedPassengers: prev.alarmedPassengers + 1
            }));
          } else {
            setStats(prev => ({
              ...prev,
              clearedPassengers: prev.clearedPassengers + 1
            }));
            addLog("Baggage scan completed. No dangerous items found.", "success");
          }
          
          resolve(foundDangerous);
          return;
        }
        
        // فحص العنصر الحالي
        const item = items[items.length - 1 - currentIndex];
        setCurrentItemIndex(items.length - 1 - currentIndex);
        
        // إذا كان العنصر خطيراً، سجّل تحذيراً
        if (item.isDangerous) {
          foundDangerous = true;
          addLog(`ALERT: Dangerous item detected - "${item.name}"`, "error");
        } else {
          addLog(`Scanned item: ${item.name} - Safe`, "info");
        }
        
        // إزالة العنصر من المكدس والانتقال إلى العنصر التالي
        baggageStack.pop();
        currentIndex++;
        
      }, 1000);
    });
  }, [baggageStack, addLog]);

  // معالجة جميع المسافرين تلقائياً
  const processAllPassengers = useCallback(async () => {
    // التحقق من وجود مسافرين في الطابور
    if (passengerQueue.isEmpty()) {
      addLog("Queue is empty. Add more passengers to continue.", "warning");
      return;
    }

    // تعيين حالة المحاكاة إلى "قيد التنفيذ"
    setSimulationInProgress(true);

    try {
      // معالجة جميع المسافرين في الطابور
      while (!passengerQueue.isEmpty()) {
        // الحصول على المسافر الأول من الطابور وإزالته
        const passenger = passengerQueue.dequeue()!;
        updatePassengersFromQueue();
        
        // إضافة سجل بدء معالجة المسافر
        addLog(`Processing passenger: ${passenger.name}`, "info");
        
        // التحقق من القائمة السوداء للمسافر الحالي
        const isBlacklisted = await checkBlacklist(passenger);
        
        // إذا لم يكن المسافر مدرجاً في القائمة السوداء، افحص أمتعته
        if (!isBlacklisted) {
          addLog(`Scanning baggage of passenger: ${passenger.name}`, "info");
          await scanBaggage(passenger.baggage.items);
        }
      }
    } finally {
      // إعادة تعيين حالة المحاكاة إلى "متوقفة" بعد الانتهاء
      setSimulationInProgress(false);
    }
  }, [passengerQueue, updatePassengersFromQueue, checkBlacklist, scanBaggage, addLog]);

  // تصدير تقرير المحاكاة
  const handleExportReport = useCallback(() => {
    // تحويل البيانات إلى تنسيق CSV
    const csvData = exportToCsv(stats, logs);
    // تنزيل ملف CSV
    downloadCsv(csvData, `security-simulation-report-${new Date().toISOString().split('T')[0]}.csv`);
    addLog("Simulation report exported to CSV", "success");
  }, [stats, logs, addLog]);

  // إرجاع الحالة والوظائف المطلوبة للمحاكاة
  return {
    passengers,
    currentItems,
    blacklistedPassports,
    logs,
    stats,
    simulationInProgress,
    scanningInProgress,
    currentItemIndex,
    currentCheckingPassport,
    initializeSimulation,
    handleLoadData,
    handleNewPassenger,
    processAllPassengers,
    handleExportReport,
  };
};
