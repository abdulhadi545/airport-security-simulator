
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
            <Ban className="h-4 w-4 mr-2" />
            {getTranslation('panel.blacklist')}
          </span>
          <span className="ml-auto bg-white text-security-alert px-2 py-0.5 rounded-full text-xs">
            {blacklist.length}
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
                    currentChecking === passport ? 'bg-red-50' : ''
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="text-sm font-medium">{passport}</span>
                      {currentChecking === passport && (
                        <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded">
                          {getTranslation('status.checking')}
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
