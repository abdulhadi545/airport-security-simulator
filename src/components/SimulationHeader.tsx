
import React from 'react';
import { Shield } from "lucide-react";

const SimulationHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between mb-4 bg-security-primary text-white p-4 rounded-lg">
      <div className="flex items-center space-x-3">
        <Shield className="h-8 w-8" />
        <div>
          <h1 className="text-xl font-bold">Airport Baggage Security Simulator</h1>
          <p className="text-sm opacity-80">Interactive simulation of airport security checkpoint</p>
        </div>
      </div>
      <div className="text-sm bg-white text-security-primary px-3 py-1 rounded-full font-medium">
        Live Simulation
      </div>
    </div>
  );
};

export default SimulationHeader;
