
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BaggageItem } from '@/models/passenger';

interface StackPanelProps {
  items: BaggageItem[];
  currentItemIndex?: number;
  scanning: boolean;
}

const StackPanel: React.FC<StackPanelProps> = ({ items, currentItemIndex = -1, scanning }) => {
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (currentItemIndex >= 0 && currentItemIndex < items.length) {
      setHighlightedIndex(currentItemIndex);
    } else {
      setHighlightedIndex(null);
    }
  }, [currentItemIndex, items.length]);
  
  return (
    <Card className="h-full">
      <CardHeader className="bg-security-secondary text-white">
        <CardTitle className="flex items-center text-base font-semibold">
          <span>Stack Panel (LIFO)</span>
          <span className="ml-auto bg-white text-security-secondary px-2 py-0.5 rounded-full text-xs">
            {items.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100%-2rem)] max-h-[350px]">
          <div className="divide-y">
            {items.length > 0 ? (
              [...items].reverse().map((item, reversedIndex) => {
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
                      <p className="font-medium">{item.name}</p>
                      <div className="text-xs text-gray-500">
                        Item #{actualIndex + 1}
                      </div>
                    </div>
                    
                    {scanning && isHighlighted && (
                      <div className={`text-xs px-2 py-1 rounded ${
                        isDangerous 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {isDangerous ? 'DANGEROUS' : 'SAFE'}
                      </div>
                    )}
                    
                    {actualIndex === items.length - 1 && !scanning && (
                      <div className="text-xs bg-blue-100 px-2 py-1 rounded text-security-secondary">
                        Top
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="p-6 text-center text-gray-500">
                No items in stack
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default StackPanel;
