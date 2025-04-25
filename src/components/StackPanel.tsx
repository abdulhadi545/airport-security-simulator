
import React, { useEffect, useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BaggageItem } from '@/models/passenger';
import { getTranslation } from '../utils/translations';
import { ChevronDown } from 'lucide-react';

// واجهة خصائص لوحة المكدس
interface StackPanelProps {
  items: BaggageItem[];     // قائمة العناصر في المكدس (الأمتعة)
  currentItemIndex?: number; // مؤشر العنصر الحالي الذي يتم فحصه
  scanning: boolean;        // حالة عملية المسح (جارية أم لا)
}

// مكون لوحة المكدس - يعرض عناصر الأمتعة المكدسة
const StackPanel: React.FC<StackPanelProps> = ({ items, currentItemIndex = -1, scanning }) => {
  // حالة لتتبع العنصر المظلل حالياً
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  // مرجع للمنطقة القابلة للتمرير للتحكم في موضع التمرير
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // تأثير جانبي لتحريك شريط التمرير تلقائيا إلى الأسفل عند تحديث العناصر
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current;
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, [items]);

  // تأثير جانبي لتحديث العنصر المظلل عند تغيير مؤشر العنصر الحالي
  useEffect(() => {
    if (currentItemIndex >= 0 && currentItemIndex < items.length) {
      setHighlightedIndex(currentItemIndex);
    } else {
      setHighlightedIndex(null);
    }
  }, [currentItemIndex, items.length]);
  
  return (
    <Card className="h-full">
      {/* ترويسة لوحة المكدس مع العنوان وعدد العناصر */}
      <CardHeader className="bg-security-secondary text-white">
        <CardTitle className="flex items-center text-base font-semibold">
          <span>
            {getTranslation('panel.stack', 'en')} / {getTranslation('panel.stack', 'ar')}
          </span>
          <span className="ml-auto bg-white text-security-secondary px-2 py-0.5 rounded-full text-xs">
            {items.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 relative">
        {/* منطقة العرض القابلة للتمرير للعناصر */}
        <div 
          ref={scrollAreaRef}
          className="h-[calc(100vh-12rem)] max-h-[350px] overflow-y-auto"
        >
          <ScrollArea className="w-full">
            <div className="divide-y">
              {items.length > 0 ? (
                // عرض العناصر بترتيب معكوس (كما في المكدس)
                [...items].reverse().map((item, reversedIndex) => {
                  // حساب المؤشر الفعلي في المصفوفة الأصلية
                  const actualIndex = items.length - 1 - reversedIndex;
                  const isDangerous = item.isDangerous;
                  const isHighlighted = actualIndex === highlightedIndex;
                  
                  return (
                    <div 
                      key={item.id} 
                      className={`p-3 flex items-center justify-between ${
                        isHighlighted ? (isDangerous ? 'bg-red-50 animate-pulse-red' : 'bg-green-50') : ''
                      }`}
                    >
                      <div className="flex-1">
                        {/* اسم العنصر */}
                        <p className="font-medium">{item.name}</p>
                        {/* رقم العنصر في المكدس */}
                        <div className="text-xs text-gray-500">
                          {getTranslation('ui.itemNumber', 'en')} / {getTranslation('ui.itemNumber', 'ar')} {actualIndex + 1}
                        </div>
                      </div>
                      
                      {/* حالة الفحص: خطر أم آمن */}
                      {scanning && isHighlighted && (
                        <div className={`text-xs px-2 py-1 rounded ${
                          isDangerous 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {isDangerous 
                            ? `${getTranslation('status.dangerous', 'en')} / ${getTranslation('status.dangerous', 'ar')}`
                            : `${getTranslation('status.safe', 'en')} / ${getTranslation('status.safe', 'ar')}`
                          }
                        </div>
                      )}
                      
                      {/* علامة "القمة" للعنصر الأعلى في المكدس */}
                      {actualIndex === items.length - 1 && !scanning && (
                        <div className="text-xs bg-blue-100 px-2 py-1 rounded text-security-secondary">
                          {getTranslation('status.top', 'en')} / {getTranslation('status.top', 'ar')}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                // عرض رسالة إذا كان المكدس فارغاً
                <div className="p-6 text-center text-gray-500">
                  {getTranslation('status.noItems', 'en')} / {getTranslation('status.noItems', 'ar')}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
        {/* سهم للإشارة إلى وجود محتوى أكثر للأسفل */}
        {items.length > 0 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-gray-500 animate-bounce">
            <ChevronDown className="h-5 w-5 opacity-50" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StackPanel;
