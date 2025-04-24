
import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getTranslation } from '../utils/translations';
import { Ban, ChevronDown } from 'lucide-react';

interface LinkedListPanelProps {
  blacklist: string[];
  currentChecking?: string;
}

const LinkedListPanel: React.FC<LinkedListPanelProps> = ({ blacklist, currentChecking }) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current;
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, [blacklist]);

  return (
    <Card className="h-full">
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
        <div 
          ref={scrollAreaRef}
          className="h-[calc(100vh-12rem)] max-h-[350px] overflow-y-auto"
        >
          <ScrollArea className="w-full">
            <div className="divide-y">
              {blacklist.length > 0 ? (
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
                          <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded">
                            {getTranslation('status.checking', 'en')} / {getTranslation('status.checking', 'ar')}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {index < blacklist.length - 1 ? '→' : ''}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500">
                  {getTranslation('status.noBlacklist', 'en')} / {getTranslation('status.noBlacklist', 'ar')}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
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
