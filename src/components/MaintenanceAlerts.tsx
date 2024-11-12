interface Alert {
  component: string;
  severity: 'low' | 'medium' | 'high';
  message: string;
  dueDate: Date;
}

interface MaintenanceAlertsProps {
  alerts: Alert[];
}

export default function MaintenanceAlerts({ alerts }: MaintenanceAlertsProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-orange-600';
      default:
        return 'text-green-600';
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Maintenance Alerts</h2>
      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
            <div className="flex justify-between items-start">
              <div className="font-medium">{alert.component}</div>
              <div className={`${getSeverityColor(alert.severity)} capitalize`}>
                {alert.severity}
              </div>
            </div>
            <div className="text-gray-600 mt-1">{alert.message}</div>
            <div className="text-sm text-gray-500 mt-1">
              Due: {alert.dueDate.toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}