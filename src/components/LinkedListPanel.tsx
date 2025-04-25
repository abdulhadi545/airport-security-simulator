
import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getTranslation } from '../utils/translations';
import { Ban, ChevronDown } from 'lucide-react';

// واجهة خصائص لوحة القائمة المتسلسلة للمنع
interface LinkedListPanelProps {
  blacklist: string[]; // قائمة أرقام جوازات السفر المدرجة في القائمة السوداء
  currentChecking?: string; // رقم جواز السفر الذي يتم فحصه حالياً (إن وجد)
}

// مكون لوحة القائمة المتسلسلة - يعرض جوازات السفر المدرجة في القائمة السوداء
const LinkedListPanel: React.FC<LinkedListPanelProps> = ({ blacklist, currentChecking }) => {
  // مرجع للمنطقة القابلة للتمرير للتحكم في موضع التمرير
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // تأثير جانبي لتحريك شريط التمرير تلقائيا إلى الأسفل عند تحديث القائمة
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current;
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, [blacklist]);

  return (
    <Card className="h-full">
      {/* ترويسة اللوحة مع عنوان وعدد العناصر المدرجة */}
      <CardHeader className="bg-security-alert text-white">
        <CardTitle className="flex items-center text-base font-semibold">
          <span className="flex items-center">
            <Ban className="h-4 w-4 mr-2" />
            {getTranslation('panel.blacklist', 'en')} / {getTranslation('panel.blacklist', 'ar')}
          </span>
          <span className="ml-auto bg-white text-security-alert px-2 py-0.5 rounded-full text-xs">
            {blacklist.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 relative">
        {/* منطقة العرض القابلة للتمرير للقائمة السوداء */}
        <div 
          ref={scrollAreaRef}
          className="h-[calc(100vh-12rem)] max-h-[350px] overflow-y-auto"
        >
          <ScrollArea className="w-full">
            <div className="divide-y">
              {blacklist.length > 0 ? (
                // عرض عناصر القائمة السوداء إذا كانت موجودة
                blacklist.map((passport, index) => (
                  <div 
                    key={index} 
                    className={`p-3 flex items-center ${
                      currentChecking === passport ? 'bg-red-50' : ''
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className="text-sm font-medium">{passport}</span>
                        {currentChecking === passport && (
                          // إظهار علامة "قيد الفحص" إذا كان هذا رقم جواز السفر الذي يتم فحصه حالياً
                          <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded">
                            {getTranslation('status.checking', 'en')} / {getTranslation('status.checking', 'ar')}
                          </span>
                        )}
                      </div>
                    </div>
                    {/* عرض سهم الارتباط بين العناصر */}
                    <div className="text-xs text-gray-500">
                      {index < blacklist.length - 1 ? '→' : ''}
                    </div>
                  </div>
                ))
              ) : (
                // عرض رسالة إذا كانت القائمة فارغة
                <div className="p-6 text-center text-gray-500">
                  {getTranslation('status.noBlacklist', 'en')} / {getTranslation('status.noBlacklist', 'ar')}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
        {/* سهم للإشارة إلى وجود محتوى أكثر للأسفل */}
        {blacklist.length > 0 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-gray-500 animate-bounce">
            <ChevronDown className="h-5 w-5 opacity-50" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LinkedListPanel;
