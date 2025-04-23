
import React, { useState, useEffect, useCallback } from 'react';
import { toast } from "@/components/ui/use-toast";
import { PassengerQueue, BaggageStack, BlacklistLinkedList } from '@/utils/dataStructures';
import { 
  Passenger, 
  BaggageItem, 
  DANGEROUS_ITEMS 
} from '@/models/passenger';
import { 
  SimulationLog, 
  SimulationStats, 
  createRandomPassenger, 
  generateInitialBlacklist,
  generateRandomPassengers,
  downloadCsv,
  exportToCsv
} from '@/utils/simulationUtils';
import { v4 as uuidv4 } from 'uuid';

import SimulationHeader from '@/components/SimulationHeader';
import QueuePanel from '@/components/QueuePanel';
import StackPanel from '@/components/StackPanel';
import LinkedListPanel from '@/components/LinkedListPanel';
import LogPanel from '@/components/LogPanel';
import ControlPanel from '@/components/ControlPanel';

const Index = () => {
  // Data structures
  const [passengerQueue] = useState<PassengerQueue>(new PassengerQueue());
  const [baggageStack] = useState<BaggageStack>(new BaggageStack());
  const [blacklistLL] = useState<BlacklistLinkedList>(new BlacklistLinkedList());
  
  // State for UI
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [currentItems, setCurrentItems] = useState<BaggageItem[]>([]);
  const [blacklistedPassports, setBlacklistedPassports] = useState<string[]>([]);
  const [logs, setLogs] = useState<SimulationLog[]>([]);
  const [stats, setStats] = useState<SimulationStats>({
    totalPassengers: 0,
    alarmedPassengers: 0,
    clearedPassengers: 0,
    blacklistMatches: 0,
  });
  
  const [simulationInProgress, setSimulationInProgress] = useState(false);
  const [scanningInProgress, setScanningInProgress] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState<number>(-1);
  const [currentCheckingPassport, setCurrentCheckingPassport] = useState<string | undefined>(undefined);
  
  // Initial setup
  useEffect(() => {
    // Initialize with some example logs
    addLog("System initialized and ready", "info");
    addLog("Welcome to Airport Baggage Security Simulator", "info");
    addLog("Use control panel to load data or add passengers", "info");
    
    // Generate initial blacklist and add to linked list
    const initialBlacklist = generateInitialBlacklist();
    initialBlacklist.forEach(passport => {
      blacklistLL.add(passport);
    });
    setBlacklistedPassports(initialBlacklist);
    
    addLog(`Initialized blacklist with ${initialBlacklist.length} entries`, "info");
    
  }, []);
  
  // Helper to add log entries
  const addLog = useCallback((message: string, type: 'info' | 'warning' | 'error' | 'success') => {
    const newLog: SimulationLog = {
      id: uuidv4(),
      timestamp: new Date(),
      message,
      type
    };
    setLogs(prevLogs => [...prevLogs, newLog]);
    
    // Also show toast for important events
    if (type === 'error' || type === 'success') {
      toast({
        title: type === 'error' ? 'Alert' : 'Success',
        description: message,
        variant: type === 'error' ? 'destructive' : 'default',
      });
    }
  }, []);
  
  // Update passengers UI state when queue changes
  const updatePassengersFromQueue = useCallback(() => {
    setPassengers(passengerQueue.getAll());
  }, [passengerQueue]);
  
  // Handle loading sample data
  const handleLoadData = useCallback(() => {
    // Generate random passengers
    const newPassengers = generateRandomPassengers(30, blacklistedPassports);
    
    // Add each passenger to the queue
    newPassengers.forEach(passenger => {
      passengerQueue.enqueue(passenger);
    });
    
    updatePassengersFromQueue();
    addLog(`Loaded ${newPassengers.length} passengers into the queue`, "success");
    
    // Update stats
    setStats(prev => ({
      ...prev,
      totalPassengers: prev.totalPassengers + newPassengers.length
    }));
  }, [blacklistedPassports, passengerQueue, updatePassengersFromQueue, addLog]);
  
  // Handle adding a new passenger
  const handleNewPassenger = useCallback(() => {
    const newPassenger = createRandomPassenger();
    
    // Small chance to create a blacklisted passenger
    if (Math.random() < 0.15 && blacklistedPassports.length > 0) {
      newPassenger.passportNumber = blacklistedPassports[Math.floor(Math.random() * blacklistedPassports.length)];
      newPassenger.blacklisted = true;
    }
    
    passengerQueue.enqueue(newPassenger);
    updatePassengersFromQueue();
    addLog(`Added passenger ${newPassenger.name} to the queue`, "info");
    
    // Update stats
    setStats(prev => ({
      ...prev,
      totalPassengers: prev.totalPassengers + 1
    }));
  }, [blacklistedPassports, passengerQueue, updatePassengersFromQueue, addLog]);
  
  // Check if passenger is in blacklist
  const checkBlacklist = useCallback((passenger: Passenger) => {
    return new Promise<boolean>((resolve) => {
      setCurrentCheckingPassport(passenger.passportNumber);
      
      // Simulate checking process with delay
      setTimeout(() => {
        const isBlacklisted = blacklistLL.contains(passenger.passportNumber);
        
        if (isBlacklisted) {
          addLog(`ALERT: Passenger ${passenger.name} is on the blacklist (Passport: ${passenger.passportNumber})`, "error");
          setStats(prev => ({
            ...prev,
            blacklistMatches: prev.blacklistMatches + 1,
            alarmedPassengers: prev.alarmedPassengers + 1
          }));
        }
        
        setCurrentCheckingPassport(undefined);
        resolve(isBlacklisted);
      }, 1000); // Simulate a 1 second check delay
    });
  }, [blacklistLL, addLog]);
  
  // Check baggage item by item
  const scanBaggage = useCallback((items: BaggageItem[]) => {
    return new Promise<boolean>((resolve) => {
      // Reset stack and add all items
      baggageStack.clear();
      items.forEach(item => baggageStack.push(item));
      setCurrentItems(items);
      
      // Start scanning animation
      setScanningInProgress(true);
      let currentIndex = 0;
      let foundDangerous = false;
      
      const scanInterval = setInterval(() => {
        if (currentIndex >= items.length) {
          clearInterval(scanInterval);
          setScanningInProgress(false);
          setCurrentItemIndex(-1);
          
          if (foundDangerous) {
            setStats(prev => ({
              ...prev,
              alarmedPassengers: prev.alarmedPassengers + 1
            }));
          } else {
            setStats(prev => ({
              ...prev,
              clearedPassengers: prev.clearedPassengers + 1
            }));
            addLog("Baggage scan completed. No dangerous items found.", "success");
          }
          
          resolve(foundDangerous);
          return;
        }
        
        // Scan current item (LIFO)
        const item = items[items.length - 1 - currentIndex];
        setCurrentItemIndex(items.length - 1 - currentIndex);
        
        if (item.isDangerous) {
          foundDangerous = true;
          addLog(`ALERT: Dangerous item detected - "${item.name}"`, "error");
        } else {
          addLog(`Scanned item: ${item.name} - Safe`, "info");
        }
        
        // Pop from stack
        baggageStack.pop();
        currentIndex++;
        
      }, 1000); // Scan each item with 1 second delay
    });
  }, [baggageStack, addLog]);
  
  // Main simulation process
  const processNextPassenger = useCallback(async () => {
    if (passengerQueue.isEmpty()) {
      addLog("Queue is empty. Add more passengers to continue.", "warning");
      return;
    }
    
    setSimulationInProgress(true);
    
    // Dequeue next passenger
    const passenger = passengerQueue.dequeue()!;
    updatePassengersFromQueue();
    
    addLog(`Processing passenger: ${passenger.name}`, "info");
    
    // Step 1: Check blacklist
    const isBlacklisted = await checkBlacklist(passenger);
    
    if (isBlacklisted) {
      // Skip baggage check if blacklisted
      setSimulationInProgress(false);
      return;
    }
    
    // Step 2: Scan baggage
    addLog(`Scanning baggage of passenger: ${passenger.name}`, "info");
    const hasDangerousItems = await scanBaggage(passenger.baggage.items);
    
    // Complete processing
    setSimulationInProgress(false);
  }, [passengerQueue, updatePassengersFromQueue, checkBlacklist, scanBaggage, addLog]);
  
  // Handle exporting report
  const handleExportReport = useCallback(() => {
    const csvData = exportToCsv(stats, logs);
    downloadCsv(csvData, `security_report_${new Date().toISOString().slice(0, 10)}.csv`);
    addLog("Exported simulation report to CSV file", "success");
  }, [stats, logs, addLog]);
  
  return (
    <div className="container px-4 py-8 mx-auto">
      <SimulationHeader />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <QueuePanel passengers={passengers} />
        <StackPanel 
          items={currentItems} 
          currentItemIndex={currentItemIndex} 
          scanning={scanningInProgress} 
        />
        <LinkedListPanel 
          blacklist={blacklistedPassports} 
          currentChecking={currentCheckingPassport} 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <LogPanel logs={logs} />
        </div>
        <div className="md:col-span-1">
          <ControlPanel 
            onLoadData={handleLoadData}
            onNewPassenger={handleNewPassenger}
            onStartSimulation={processNextPassenger}
            onExportReport={handleExportReport}
            stats={stats}
            simulationInProgress={simulationInProgress}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
