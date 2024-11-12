import db from '../db';

export interface MaintenanceRecord {
  id: number;
  vehicle_id: number;
  service_type: string;
  description: string;
  mileage: number;
  service_date: string;
  next_service_date: string;
  cost: number;
}

export const MaintenanceRecordModel = {
  findByVehicleId: (vehicleId: number) => {
    const stmt = db.prepare('SELECT * FROM maintenance_records WHERE vehicle_id = ? ORDER BY service_date DESC');
    return stmt.all(vehicleId) as MaintenanceRecord[];
  },

  create: (record: Omit<MaintenanceRecord, 'id'>) => {
    const stmt = db.prepare(`
      INSERT INTO maintenance_records (
        vehicle_id, service_type, description, mileage, 
        service_date, next_service_date, cost
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    return stmt.run(
      record.vehicle_id,
      record.service_type,
      record.description,
      record.mileage,
      record.service_date,
      record.next_service_date,
      record.cost
    );
  }
};