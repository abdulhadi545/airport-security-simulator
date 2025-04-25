
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SimulationStats } from '@/utils/simulationUtils';
import { Separator } from "@/components/ui/separator";
import { getTranslation } from '../utils/translations';

// واجهة خصائص لوحة التحكم
interface ControlPanelProps {
  onLoadData: () => void;              // دالة لتحميل البيانات
  onNewPassenger: () => void;          // دالة لإضافة مسافر جديد
  onStartSimulation: () => void;       // دالة لبدء المحاكاة
  onExportReport: () => void;          // دالة لتصدير التقرير
  stats: SimulationStats;              // إحصائيات المحاكاة
  simulationInProgress: boolean;       // حالة المحاكاة (جارية أو متوقفة)
}

// مكون لوحة التحكم - يتحكم في عملية المحاكاة ويعرض الإحصائيات
const ControlPanel: React.FC<ControlPanelProps> = ({
  onLoadData,
  onNewPassenger,
  onStartSimulation,
  onExportReport,
  stats,
  simulationInProgress
}) => {
  return (
    <Card className="h-full">
      {/* ترويسة لوحة التحكم */}
      <CardHeader className="bg-security-primary text-white">
        <CardTitle className="text-base font-semibold">
          {getTranslation('panel.controls', 'en')} / {getTranslation('panel.controls', 'ar')}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 flex flex-col gap-3">
        {/* أزرار التحكم الرئيسية */}
        <div className="grid grid-cols-2 gap-3">
          {/* زر تحميل البيانات */}
          <Button 
            variant="outline" 
            onClick={onLoadData}
            disabled={simulationInProgress}
            className="border-security-primary text-security-primary hover:bg-security-primary hover:text-white"
          >
            {getTranslation('button.loadData', 'en')} / {getTranslation('button.loadData', 'ar')}
          </Button>
          {/* زر إضافة مسافر جديد */}
          <Button 
            variant="outline" 
            onClick={onNewPassenger}
            disabled={simulationInProgress}
            className="border-security-secondary text-security-secondary hover:bg-security-secondary hover:text-white"
          >
            {getTranslation('button.newPassenger', 'en')} / {getTranslation('button.newPassenger', 'ar')}
          </Button>
        </div>
        
        {/* زر بدء المحاكاة */}
        <Button 
          variant="default" 
          onClick={onStartSimulation} 
          disabled={simulationInProgress}
          className="bg-security-accent hover:bg-security-secondary text-white"
        >
          {getTranslation('button.startSimulation', 'en')} / {getTranslation('button.startSimulation', 'ar')}
        </Button>
        
        {/* فاصل بين أزرار التحكم وقسم الإحصائيات */}
        <Separator className="my-2" />
        
        {/* عنوان قسم الإحصائيات */}
        <div className="text-sm font-medium">
          {getTranslation('ui.statistics', 'en')} / {getTranslation('ui.statistics', 'ar')}
        </div>
        
        {/* عرض الإحصائيات */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          {/* إجمالي عدد المسافرين */}
          <div className="bg-gray-50 p-2 rounded">
            <div className="text-xs text-gray-500">
              {getTranslation('stats.totalPassengers', 'en')} / {getTranslation('stats.totalPassengers', 'ar')}
            </div>
            <div className="font-semibold">{stats.totalPassengers}</div>
          </div>
          {/* عدد المسافرين المشتبه بهم */}
          <div className="bg-gray-50 p-2 rounded">
            <div className="text-xs text-gray-500">
              {getTranslation('stats.alarmedPassengers', 'en')} / {getTranslation('stats.alarmedPassengers', 'ar')}
            </div>
            <div className="font-semibold text-security-alert">{stats.alarmedPassengers}</div>
          </div>
          {/* عدد المسافرين الذين تم تخليصهم */}
          <div className="bg-gray-50 p-2 rounded">
            <div className="text-xs text-gray-500">
              {getTranslation('stats.clearedPassengers', 'en')} / {getTranslation('stats.clearedPassengers', 'ar')}
            </div>
            <div className="font-semibold text-security-success">{stats.clearedPassengers}</div>
          </div>
          {/* عدد التطابقات مع القائمة السوداء */}
          <div className="bg-gray-50 p-2 rounded">
            <div className="text-xs text-gray-500">
              {getTranslation('stats.blacklistMatches', 'en')} / {getTranslation('stats.blacklistMatches', 'ar')}
            </div>
            <div className="font-semibold text-security-warning">{stats.blacklistMatches}</div>
          </div>
        </div>
        
        {/* زر تصدير التقرير */}
        <Button 
          variant="outline" 
          onClick={onExportReport}
          className="border-gray-400 text-gray-600 hover:bg-gray-200 hover:text-gray-800 mt-2"
        >
          {getTranslation('button.exportReport', 'en')} / {getTranslation('button.exportReport', 'ar')}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ControlPanel;
