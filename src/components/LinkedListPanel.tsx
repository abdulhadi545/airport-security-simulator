
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getTranslation } from '../utils/translations';
import { Ban } from 'lucide-react';

interface LinkedListPanelProps {
  blacklist: string[];
  currentChecking?: string;
}

const LinkedListPanel: React.FC<LinkedListPanelProps> = ({ blacklist, currentChecking }) => {
  return (
    <Card className="h-full">
      <CardHeader className="bg-security-alert text-white">
        <CardTitle className="flex items-center text-base font-semibold">
          <span className="flex items-center">
            <Ban className="h-4 w-4 mr-2" /> {/* أيقونة الحظر - Ban icon */}
            {getTranslation('panel.blacklist')}
          </span>
          <span className="ml-auto bg-white text-security-alert px-2 py-0.5 rounded-full text-xs">
            {blacklist.length} {/* عدد العناصر في القائمة السوداء - Count of items in blacklist */}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100%-2rem)] max-h-[350px]">
          <div className="divide-y">
            {blacklist.length > 0 ? (
              blacklist.map((passport, index) => (
                <div 
                  key={index} 
                  className={`p-3 flex items-center ${
                    // تمييز جواز السفر الذي يتم فحصه حاليًا - Highlight passport being checked currently
                    currentChecking === passport ? 'bg-red-50' : ''
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="text-sm font-medium">{passport}</span>
                      {currentChecking === passport && (
                        // عرض حالة الفحص إذا كان هذا الجواز قيد الفحص - Show checking status if this passport is being checked
                        <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded">
                          {getTranslation('status.checking')}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {/* رمز السهم للإشارة إلى الارتباط بالعنصر التالي في القائمة المتسلسلة 
                        Arrow symbol indicating link to next item in linked list */}
                    {index < blacklist.length - 1 ? '→' : ''}
                  </div>
                </div>
              ))
            ) : (
              // رسالة عندما تكون القائمة السوداء فارغة - Message when blacklist is empty
              <div className="p-6 text-center text-gray-500">
                {getTranslation('status.noBlacklist')}
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default LinkedListPanel;
