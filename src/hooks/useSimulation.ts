import { useState, useCallback } from 'react';
import { toast } from "@/components/ui/use-toast";
import { PassengerQueue, BaggageStack, BlacklistLinkedList } from '@/utils/dataStructures';
import { Passenger, BaggageItem } from '@/models/passenger';
import { 
  SimulationLog, 
  SimulationStats,
  createRandomPassenger,
  generateInitialBlacklist,
  generateRandomPassengers,
  exportToCsv,
  downloadCsv
} from '@/utils/simulationUtils';
import { v4 as uuidv4 } from 'uuid';

export const useSimulation = () => {
  // Data structures
  const [passengerQueue] = useState<PassengerQueue>(new PassengerQueue());
  const [baggageStack] = useState<BaggageStack>(new BaggageStack());
  const [blacklistLL] = useState<BlacklistLinkedList>(new BlacklistLinkedList());
  
  // State
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

  // Initialize simulation
  const initializeSimulation = useCallback(() => {
    const initialBlacklist = generateInitialBlacklist();
    initialBlacklist.forEach(passport => {
      blacklistLL.add(passport);
    });
    setBlacklistedPassports(initialBlacklist);
    addLog("System initialized and ready", "info");
    addLog("Welcome to Airport Baggage Security Simulator", "info");
    addLog("Use control panel to load data or add passengers", "info");
    addLog(`Initialized blacklist with ${initialBlacklist.length} entries`, "info");
  }, [blacklistLL]);

  // Helper to add log entries
  const addLog = useCallback((message: string, type: 'info' | 'warning' | 'error' | 'success') => {
    const newLog: SimulationLog = {
      id: uuidv4(),
      timestamp: new Date(),
      message,
      type
    };
    setLogs(prevLogs => [...prevLogs, newLog]);
    
    if (type === 'error' || type === 'success') {
      toast({
        title: type === 'error' ? 'Alert' : 'Success',
        description: message,
        variant: type === 'error' ? 'destructive' : 'default',
      });
    }
  }, []);

  // Update passengers UI state
  const updatePassengersFromQueue = useCallback(() => {
    setPassengers(passengerQueue.getAll());
  }, [passengerQueue]);

  // Load sample data
  const handleLoadData = useCallback(() => {
    const newPassengers = generateRandomPassengers(30, blacklistedPassports);
    newPassengers.forEach(passenger => {
      passengerQueue.enqueue(passenger);
    });
    
    updatePassengersFromQueue();
    addLog(`Loaded ${newPassengers.length} passengers into the queue`, "success");
    
    setStats(prev => ({
      ...prev,
      totalPassengers: prev.totalPassengers + newPassengers.length
    }));
  }, [blacklistedPassports, passengerQueue, updatePassengersFromQueue, addLog]);

  // Add new passenger
  const handleNewPassenger = useCallback(() => {
    const newPassenger = createRandomPassenger();
    
    if (Math.random() < 0.15 && blacklistedPassports.length > 0) {
      newPassenger.passportNumber = blacklistedPassports[Math.floor(Math.random() * blacklistedPassports.length)];
      newPassenger.blacklisted = true;
    }
    
    passengerQueue.enqueue(newPassenger);
    updatePassengersFromQueue();
    addLog(`Added passenger ${newPassenger.name} to the queue`, "info");
    
    setStats(prev => ({
      ...prev,
      totalPassengers: prev.totalPassengers + 1
    }));
  }, [blacklistedPassports, passengerQueue, updatePassengersFromQueue, addLog]);

  // Check blacklist
  const checkBlacklist = useCallback((passenger: Passenger) => {
    return new Promise<boolean>((resolve) => {
      setCurrentCheckingPassport(passenger.passportNumber);
      
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
      }, 1000);
    });
  }, [blacklistLL, addLog]);

  // Scan baggage
  const scanBaggage = useCallback((items: BaggageItem[]) => {
    return new Promise<boolean>((resolve) => {
      baggageStack.clear();
      items.forEach(item => baggageStack.push(item));
      setCurrentItems(items);
      
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
        
        const item = items[items.length - 1 - currentIndex];
        setCurrentItemIndex(items.length - 1 - currentIndex);
        
        if (item.isDangerous) {
          foundDangerous = true;
          addLog(`ALERT: Dangerous item detected - "${item.name}"`, "error");
        } else {
          addLog(`Scanned item: ${item.name} - Safe`, "info");
        }
        
        baggageStack.pop();
        currentIndex++;
        
      }, 1000);
    });
  }, [baggageStack, addLog]);

  // Process all passengers automatically
  const processAllPassengers = useCallback(async () => {
    if (passengerQueue.isEmpty()) {
      addLog("Queue is empty. Add more passengers to continue.", "warning");
      return;
    }

    setSimulationInProgress(true);

    try {
      // Process all passengers in the queue
      while (!passengerQueue.isEmpty()) {
        const passenger = passengerQueue.dequeue()!;
        updatePassengersFromQueue();
        
        addLog(`Processing passenger: ${passenger.name}`, "info");
        
        // Check blacklist for current passenger
        const isBlacklisted = await checkBlacklist(passenger);
        
        if (!isBlacklisted) {
          addLog(`Scanning baggage of passenger: ${passenger.name}`, "info");
          await scanBaggage(passenger.baggage.items);
        }
      }
    } finally {
      setSimulationInProgress(false);
    }
  }, [passengerQueue, updatePassengersFromQueue, checkBlacklist, scanBaggage, addLog]);

  // Export simulation report
  const handleExportReport = useCallback(() => {
    const csvData = exportToCsv(stats, logs);
    downloadCsv(csvData, `security-simulation-report-${new Date().toISOString().split('T')[0]}.csv`);
    addLog("Simulation report exported to CSV", "success");
  }, [stats, logs, addLog]);

  return {
    passengers,
    currentItems,
    blacklistedPassports,
    logs,
    stats,
    simulationInProgress,
    scanningInProgress,
    currentItemIndex,
    currentCheckingPassport,
    initializeSimulation,
    handleLoadData,
    handleNewPassenger,
    processAllPassengers,
    handleExportReport,
  };
};
