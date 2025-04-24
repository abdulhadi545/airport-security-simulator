
import React, { useEffect } from 'react';
import { useSimulation } from '@/hooks/useSimulation';

import SimulationHeader from '@/components/SimulationHeader';
import QueuePanel from '@/components/QueuePanel';
import StackPanel from '@/components/StackPanel';
import LinkedListPanel from '@/components/LinkedListPanel';
import LogPanel from '@/components/LogPanel';
import ControlPanel from '@/components/ControlPanel';

const Index = () => {
  const {
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
    processNextPassenger,
    handleExportReport,
  } = useSimulation();

  useEffect(() => {
    initializeSimulation();
  }, [initializeSimulation]);
  
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
