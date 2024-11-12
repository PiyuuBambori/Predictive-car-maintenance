import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import HealthOverview from '../components/HealthOverview';
import MaintenanceAlerts from '../components/MaintenanceAlerts';
import MileageInfo from '../components/MileageInfo';
import ScheduleMaintenance from '../components/ScheduleMaintenance';
import PredictiveMaintenance from '../components/PredictiveMaintenance';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [carData, setCarData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      // Simulate API call
      setTimeout(() => {
        setCarData({
          name: 'Toyota',
          make: 'Toyota',
          model: 'Camry',
          year: 2020,
          healthPercentage: 85,
          engineHealth: 92,
          oilLife: 65,
          batteryHealth: 95,
          mileage: 25000,
          currentMileage: 25000,
          averageMilesPerYear: 12000,
          nextService: new Date(2024, 5, 15),
          maintenanceHistory: [
            {
              serviceType: 'oilChange',
              date: new Date(2024, 1, 15),
              mileage: 22000
            },
            {
              serviceType: 'tireRotation',
              date: new Date(2024, 0, 1),
              mileage: 21000
            },
            {
              serviceType: 'brakeService',
              date: new Date(2023, 10, 15),
              mileage: 19000
            }
          ],
          alerts: [
            {
              component: 'Oil Change',
              severity: 'medium',
              message: 'Oil change recommended within next 1000 miles',
              dueDate: new Date(2024, 4, 1)
            },
            {
              component: 'Tire Rotation',
              severity: 'low',
              message: 'Tire rotation recommended',
              dueDate: new Date(2024, 4, 15)
            },
            {
              component: 'Brake Inspection',
              severity: 'high',
              message: 'Brake pads showing significant wear',
              dueDate: new Date(2024, 3, 30)
            }
          ]
        });
        setIsLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-white text-xl font-bold">Car Health Monitor</h1>
            </div>
            <div className="flex items-center">
              <span className="text-white mr-4">Welcome, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <HealthOverview data={carData} />
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <MileageInfo data={carData} />
            <MaintenanceAlerts alerts={carData.alerts} />
          </div>
          <ScheduleMaintenance carData={carData} />
          <PredictiveMaintenance vehicleData={carData} />
        </div>
      </main>
    </div>
  );
}