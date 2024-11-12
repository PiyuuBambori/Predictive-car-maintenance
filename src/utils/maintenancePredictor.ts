interface MaintenanceHistory {
  serviceType: string;
  date: Date;
  mileage: number;
}

interface VehicleData {
  make: string;
  model: string;
  year: number;
  currentMileage: number;
  averageMilesPerYear: number;
  maintenanceHistory: MaintenanceHistory[];
}

interface MaintenancePrediction {
  serviceType: string;
  urgency: 'low' | 'medium' | 'high';
  predictedDate: Date;
  predictedMileage: number;
  confidence: number;
  recommendation: string;
}

export function predictMaintenanceNeeds(vehicleData: VehicleData): MaintenancePrediction[] {
  const predictions: MaintenancePrediction[] = [];
  const currentDate = new Date();
  const vehicleAge = currentDate.getFullYear() - vehicleData.year;

  // Service intervals (in miles) based on manufacturer recommendations
  const serviceIntervals = {
    oilChange: 5000,
    tireRotation: 7500,
    brakeService: 30000,
    airFilter: 15000,
    sparkPlugs: 60000,
    transmission: 60000,
    deepCleaning: 10000,
    beltInspection: 40000
  };

  // Calculate average daily mileage
  const dailyMileage = vehicleData.averageMilesPerYear / 365;

  // Function to find last service of a specific type
  const getLastService = (type: string): MaintenanceHistory | undefined => {
    return vehicleData.maintenanceHistory
      .filter(h => h.serviceType === type)
      .sort((a, b) => b.date.getTime() - a.date.getTime())[0];
  };

  // Predict each maintenance type
  Object.entries(serviceIntervals).forEach(([serviceType, interval]) => {
    const lastService = getLastService(serviceType);
    const mileageSinceService = lastService 
      ? vehicleData.currentMileage - lastService.mileage 
      : vehicleData.currentMileage;
    
    const daysSinceService = lastService 
      ? Math.floor((currentDate.getTime() - lastService.date.getTime()) / (1000 * 60 * 60 * 24))
      : vehicleAge * 365;

    // Calculate remaining miles until service
    const milesUntilService = interval - mileageSinceService;
    
    // Predict date of next service
    const daysUntilService = Math.floor(milesUntilService / dailyMileage);
    const predictedDate = new Date();
    predictedDate.setDate(predictedDate.getDate() + daysUntilService);
    
    // Calculate urgency based on remaining miles percentage
    const remainingPercentage = (milesUntilService / interval) * 100;
    let urgency: 'low' | 'medium' | 'high' = 'low';
    if (remainingPercentage <= 20) {
      urgency = 'high';
    } else if (remainingPercentage <= 40) {
      urgency = 'medium';
    }

    // Calculate confidence based on maintenance history consistency
    const serviceHistory = vehicleData.maintenanceHistory.filter(h => h.serviceType === serviceType);
    const historyConsistency = serviceHistory.length >= 2 ? 0.9 : 0.7;
    const confidence = Math.min(0.95, historyConsistency);

    // Generate recommendation
    const recommendation = generateRecommendation(
      serviceType,
      milesUntilService,
      daysUntilService,
      vehicleAge
    );

    predictions.push({
      serviceType,
      urgency,
      predictedDate,
      predictedMileage: vehicleData.currentMileage + milesUntilService,
      confidence,
      recommendation
    });
  });

  return predictions.sort((a, b) => {
    const urgencyOrder = { high: 0, medium: 1, low: 2 };
    return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
  });
}

function generateRecommendation(
  serviceType: string,
  milesUntilService: number,
  daysUntilService: number,
  vehicleAge: number
): string {
  const serviceNames: { [key: string]: string } = {
    oilChange: 'Oil Change',
    tireRotation: 'Tire Rotation',
    brakeService: 'Brake Service',
    airFilter: 'Air Filter Replacement',
    sparkPlugs: 'Spark Plug Replacement',
    transmission: 'Transmission Service',
    deepCleaning: 'Deep Cleaning',
    beltInspection: 'Belt Inspection'
  };

  if (milesUntilService <= 0) {
    return `${serviceNames[serviceType]} is overdue. Schedule service as soon as possible.`;
  }

  if (daysUntilService <= 7) {
    return `${serviceNames[serviceType]} will be needed within a week.`;
  }

  if (vehicleAge > 5 && ['transmission', 'sparkPlugs', 'brakeService'].includes(serviceType)) {
    return `${serviceNames[serviceType]} should be prioritized due to vehicle age.`;
  }

  return `${serviceNames[serviceType]} will be needed in approximately ${Math.ceil(daysUntilService / 7)} weeks.`;
}