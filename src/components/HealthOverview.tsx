interface HealthOverviewProps {
  data: {
    engineHealth: number;
    oilLife: number;
    batteryHealth: number;
  };
}

export default function HealthOverview({ data }: HealthOverviewProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Vehicle Health Overview</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">{data.engineHealth}%</div>
          <div className="text-gray-600">Engine Health</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">{data.oilLife}%</div>
          <div className="text-gray-600">Oil Life</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">{data.batteryHealth}%</div>
          <div className="text-gray-600">Battery Health</div>
        </div>
      </div>
    </div>
  );
}