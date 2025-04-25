
import React, { useEffect } from 'react';
import { useSimulation } from '@/hooks/useSimulation';

import SimulationHeader from '@/components/SimulationHeader';
import QueuePanel from '@/components/QueuePanel';
import StackPanel from '@/components/StackPanel';
import LinkedListPanel from '@/components/LinkedListPanel';
import LogPanel from '@/components/LogPanel';
import ControlPanel from '@/components/ControlPanel';

// الصفحة الرئيسية للتطبيق - تجمع كل مكونات المحاكاة
const Index = () => {
  // استخدام خطاف المحاكاة للحصول على البيانات والوظائف
  const {
    passengers,            // قائمة المسافرين
    currentItems,          // قائمة العناصر الحالية
    blacklistedPassports,  // قائمة جوازات السفر المدرجة في القائمة السوداء
    logs,                  // سجلات المحاكاة
    stats,                 // إحصائيات المحاكاة
    simulationInProgress,  // حالة المحاكاة (جارية أو متوقفة)
    scanningInProgress,    // حالة المسح (جارٍ أو متوقف)
    currentItemIndex,      // مؤشر العنصر الحالي الذي يتم فحصه
    currentCheckingPassport, // رقم جواز السفر الذي يتم فحصه حالياً
    initializeSimulation,  // دالة لتهيئة المحاكاة
    handleLoadData,        // دالة لتحميل البيانات
    handleNewPassenger,    // دالة لإضافة مسافر جديد
    processAllPassengers,  // دالة لمعالجة جميع المسافرين
    handleExportReport,    // دالة لتصدير التقرير
  } = useSimulation();

  // تهيئة المحاكاة عند تحميل الصفحة
  useEffect(() => {
    initializeSimulation();
  }, [initializeSimulation]);
  
  return (
    <div className="container px-4 py-8 mx-auto">
      {/* ترويسة التطبيق */}
      <SimulationHeader />
      
      {/* اللوحات الرئيسية - تعرض طابور المسافرين، مكدس الأمتعة، والقائمة السوداء */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* لوحة الطابور - تعرض المسافرين المنتظرين */}
        <QueuePanel passengers={passengers} />
        {/* لوحة المكدس - تعرض الأمتعة التي يتم فحصها */}
        <StackPanel 
          items={currentItems} 
          currentItemIndex={currentItemIndex} 
          scanning={scanningInProgress} 
        />
        {/* لوحة القائمة المتسلسلة - تعرض جوازات السفر في القائمة السوداء */}
        <LinkedListPanel 
          blacklist={blacklistedPassports} 
          currentChecking={currentCheckingPassport} 
        />
      </div>
      
      {/* اللوحات السفلية - تعرض السجلات ولوحة التحكم */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* لوحة السجلات - تعرض أحداث المحاكاة */}
        <div className="md:col-span-2">
          <LogPanel logs={logs} />
        </div>
        {/* لوحة التحكم - للتحكم في عملية المحاكاة */}
        <div className="md:col-span-1">
          <ControlPanel 
            onLoadData={handleLoadData}
            onNewPassenger={handleNewPassenger}
            onStartSimulation={processAllPassengers}
            onExportReport={handleExportReport}
            stats={stats}
            simulationInProgress={simulationInProgress}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
