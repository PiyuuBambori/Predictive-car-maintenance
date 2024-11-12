import db from '../db';

export interface MaintenanceAlert {
  id: number;
  vehicle_id: number;
  component: string;
  severity: 'low' | 'medium' | 'high';
  message: string;
  due_date: string;
  resolved: boolean;
  created_at: string;
}

export const MaintenanceAlertModel = {
  findByVehicleId: (vehicleId: number) => {
    const stmt = db.prepare(`
      SELECT * FROM maintenance_alerts 
      WHERE vehicle_id = ? AND resolved = 0 
      ORDER BY due_date ASC
    `);
    return stmt.all(vehicleId) as MaintenanceAlert[];
  },

  markResolved: (alertId: number) => {
    const stmt = db.prepare('UPDATE maintenance_alerts SET resolved = 1 WHERE id = ?');
    return stmt.run(alertId);
  },

  create: (alert: Omit<MaintenanceAlert, 'id' | 'resolved' | 'created_at'>) => {
    const stmt = db.prepare(`
      INSERT INTO maintenance_alerts (vehicle_id, component, severity, message, due_date)
      VALUES (?, ?, ?, ?, ?)
    `);
    return stmt.run(
      alert.vehicle_id,
      alert.component,
      alert.severity,
      alert.message,
      alert.due_date
    );
  }
};