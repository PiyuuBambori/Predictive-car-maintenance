import React, { useState } from 'react';
import { predictMaintenanceNeeds } from '../utils/maintenancePredictor';

interface PredictiveMaintenanceProps {
  vehicleData: {
    make: string;
    model: string;
    year: number;
    currentMileage: number;
    averageMilesPerYear: number;
    maintenanceHistory: Array<{
      serviceType: string;
      date: Date;
      mileage: number;
    }>;
  };
}

export default function PredictiveMaintenance({ vehicleData }: PredictiveMaintenanceProps) {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const predictions = predictMaintenanceNeeds(vehicleData);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const formatConfidence = (confidence: number) => {
    return `${(confidence * 100).toFixed(0)}%`;
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">AI Predictive Maintenance</h2>
      <p className="text-gray-600 mb-6">
        Based on your {vehicleData.year} {vehicleData.make} {vehicleData.model}'s history and usage patterns
      </p>

      <div className="space-y-4">
        {predictions.map((prediction, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedService(prediction.serviceType)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-lg">{prediction.serviceType}</h3>
                <p className="text-gray-600 mt-1">{prediction.recommendation}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getUrgencyColor(
                  prediction.urgency
                )}`}
              >
                {prediction.urgency.toUpperCase()}
              </span>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Predicted Date:</span>
                <br />
                {prediction.predictedDate.toLocaleDateString()}
              </div>
              <div>
                <span className="text-gray-600">At Mileage:</span>
                <br />
                {prediction.predictedMileage.toLocaleString()} miles
              </div>
            </div>
            
            <div className="mt-2">
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">AI Confidence:</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-blue-600 rounded-full"
                    style={{ width: formatConfidence(prediction.confidence) }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 ml-2">
                  {formatConfidence(prediction.confidence)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Schedule {selectedService}</h3>
            <p className="text-gray-600 mb-4">
              Would you like to schedule this maintenance service now?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle scheduling logic here
                  setSelectedService(null);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Schedule Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}