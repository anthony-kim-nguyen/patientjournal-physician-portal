import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CarePlanData {
  careplan: any;          
  questionnaires: any[];
  medications: any[];
  patient: any;
}

interface CarePlanContextType {
  carePlanData: CarePlanData | null;
  setCarePlanData: (data: CarePlanData | null) => void;
}

// Create context with default undefined value
const CarePlanContext = createContext<CarePlanContextType | undefined>(undefined);

// Provider component
export const CarePlanProvider = ({ children }: { children: ReactNode }) => {
  const [carePlanData, setCarePlanData] = useState<CarePlanData | null>(null);

  return (
    <CarePlanContext.Provider value={{ carePlanData, setCarePlanData }}>
      {children}
    </CarePlanContext.Provider>
  );
};

// Hook for consuming the context
export const useCarePlan = (): CarePlanContextType => {
  const context = useContext(CarePlanContext);
  if (context === undefined) {
    throw new Error('useCarePlan must be used within a CarePlanProvider');
  }
  return context;
};
