
import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SimulationLog } from '@/utils/simulationUtils';
import { getTranslation } from '../utils/translations';
import { Logs } from 'lucide-react';

interface LogPanelProps {
  logs: SimulationLog[];
}

const LogPanel: React.FC<LogPanelProps> = ({ logs }) => {
  // مرجع لمنطقة التمرير للوصول إليها مباشرة عبر DOM - Reference to scroll area for direct DOM access
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // تأثير جانبي للتمرير التلقائي إلى أسفل عند إضافة سجلات جديدة - Side effect to auto-scroll to bottom when new logs added
  useEffect(() => {
    // التمرير إلى الأسفل عند تغيير السجلات - Scroll to bottom when logs change
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current;
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, [logs]);

  // تحديد فئات التنسيق بناءً على نوع السجل - Determine styling classes based on log type
  const getLogTypeClasses = (type: string) => {
    switch (type) {
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200'; // تنسيق الخطأ - Error styling
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'; // تنسيق التحذير - Warning styling
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200'; // تنسيق النجاح - Success styling
      default:
        return 'bg-blue-50 text-blue-800 border-blue-100'; // تنسيق المعلومات - Info styling
    }
  };
  
  return (
    <Card className="h-full">
      <CardHeader className="bg-gray-800 text-white">
        <CardTitle className="flex items-center text-base font-semibold">
          <span className="flex items-center">
            <Logs className="h-4 w-4 mr-2" /> {/* أيقونة السجلات - Logs icon */}
            {getTranslation('panel.logs')}
          </span>
          <span className="ml-auto bg-white text-gray-800 px-2 py-0.5 rounded-full text-xs">
            {logs.length} {/* عدد السجلات - Log count */}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div 
          ref={scrollAreaRef}
          className="h-[calc(100%-2rem)] max-h-[350px] overflow-y-auto"
        >
          <div className="divide-y">
            {logs.length > 0 ? (
              logs.map((log) => (
                <div 
                  key={log.id} 
                  className={`p-3 border-l-4 ${getLogTypeClasses(log.type)}`}
                >
                  <div className="text-xs opacity-70">
                    {log.timestamp.toLocaleTimeString()} {/* وقت السجل - Log timestamp */}
                  </div>
                  <div className="text-sm mt-1">
                    {log.message} {/* محتوى السجل - Log content */}
                  </div>
                </div>
              ))
            ) : (
              // رسالة عندما لا توجد سجلات - Message when no logs exist
              <div className="p-6 text-center text-gray-500">
                {getTranslation('status.noLogs')}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LogPanel;
