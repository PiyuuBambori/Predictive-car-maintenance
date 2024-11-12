import React, { useState } from 'react';

interface ScheduleMaintenanceProps {
  carData: {
    name: string;
    model: string;
    year: number;
    healthPercentage: number;
    nextService: Date;
  };
}

export default function ScheduleMaintenance({ carData }: ScheduleMaintenanceProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getHealthColor = (health: number) => {
    if (health >= 80) return 'text-green-600';
    if (health >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mt-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Schedule Maintenance</h2>
          <p className="text-gray-600 mt-1">
            {carData.year} {carData.name} {carData.model}
          </p>
        </div>
        <div className="text-right">
          <div className={`text-2xl font-bold ${getHealthColor(carData.healthPercentage)}`}>
            {carData.healthPercentage}%
          </div>
          <div className="text-sm text-gray-600">Overall Health</div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-gray-600">Next Service Due</p>
            <p className="text-lg font-medium">{carData.nextService.toLocaleDateString()}</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Schedule Service
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Schedule Maintenance Service</h3>
            <p className="text-gray-600 mb-4">
              Please contact our service center to schedule your maintenance:
            </p>
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <p className="font-medium">Service Center Hours:</p>
              <p className="text-gray-600">Monday - Friday: 8:00 AM - 6:00 PM</p>
              <p className="text-gray-600">Saturday: 9:00 AM - 3:00 PM</p>
              <p className="text-gray-600 mt-2">Phone: (555) 123-4567</p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}