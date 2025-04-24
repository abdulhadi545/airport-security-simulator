
import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SimulationLog } from '@/utils/simulationUtils';
import { getTranslation } from '../utils/translations';
import { Logs } from 'lucide-react';

interface LogPanelProps {
  logs: SimulationLog[];
}

const LogPanel: React.FC<LogPanelProps> = ({ logs }) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current;
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, [logs]);
  
  return (
    <Card className="h-full">
      <CardHeader className="bg-gray-800 text-white">
        <CardTitle className="flex items-center text-base font-semibold">
          <span className="flex items-center">
            <Logs className="h-4 w-4 mr-2" />
            {getTranslation('panel.logs', 'en')} / {getTranslation('panel.logs', 'ar')}
          </span>
          <span className="ml-auto bg-white text-gray-800 px-2 py-0.5 rounded-full text-xs">
            {logs.length}
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
                    {log.timestamp.toLocaleTimeString()}
                  </div>
                  <div className="text-sm mt-1">
                    {log.message}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">
                {getTranslation('status.noLogs', 'en')} / {getTranslation('status.noLogs', 'ar')}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function for log type classes
const getLogTypeClasses = (type: string) => {
  switch (type) {
    case 'error':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'warning':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'success':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-blue-50 text-blue-800 border-blue-100';
  }
};

export default LogPanel;
