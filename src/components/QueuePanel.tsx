
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Passenger } from '@/models/passenger';
import { getTranslation } from '../utils/translations';

interface QueuePanelProps {
  passengers: Passenger[];
}

const QueuePanel: React.FC<QueuePanelProps> = ({ passengers }) => {
  return (
    <Card className="h-full">
      <CardHeader className="bg-security-primary text-white">
        <CardTitle className="flex items-center text-base font-semibold">
          <span>{getTranslation('panel.queue')}</span>
          <span className="ml-auto bg-white text-security-primary px-2 py-0.5 rounded-full text-xs">
            {passengers.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100%-2rem)] max-h-[350px]">
          <div className="divide-y">
            {passengers.length > 0 ? (
              passengers.map((passenger, index) => (
                <div 
                  key={passenger.id} 
                  className={`p-3 flex items-center ${index === 0 ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex-1">
                    <p className="font-medium">{passenger.name}</p>
                    <div className="flex text-xs text-gray-500 space-x-2">
                      <span>{getTranslation('ui.nationality')}: {passenger.nationality}</span>
                      <span>•</span>
                      <span>{getTranslation('ui.flight')}: {passenger.flight}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {getTranslation('ui.passport')}: {passenger.passportNumber}
                    </div>
                  </div>
                  {index === 0 && (
                    <div className="text-xs bg-blue-100 px-2 py-1 rounded text-security-secondary">
                      {getTranslation('status.next')}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">
                {getTranslation('status.noPassengers')}
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default QueuePanel;
