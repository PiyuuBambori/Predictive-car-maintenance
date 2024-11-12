import db from '../db';

export interface Vehicle {
  id: number;
  user_id: number;
  make: string;
  model: string;
  year: number;
  vin: string;
  current_mileage: number;
}

export interface VehicleHealth {
  engine_health: number;
  oil_life: number;
  battery_health: number;
  tire_health: number;
  last_updated: string;
}

export const VehicleModel = {
  findByUserId: (userId: number) => {
    const stmt = db.prepare('SELECT * FROM vehicles WHERE user_id = ?');
    return stmt.all(userId) as Vehicle[];
  },

  getHealth: (vehicleId: number) => {
    const stmt = db.prepare('SELECT * FROM vehicle_health WHERE vehicle_id = ? ORDER BY last_updated DESC LIMIT 1');
    return stmt.get(vehicleId) as VehicleHealth | undefined;
  },

  updateMileage: (vehicleId: number, mileage: number) => {
    const stmt = db.prepare('UPDATE vehicles SET current_mileage = ? WHERE id = ?');
    return stmt.run(mileage, vehicleId);
  }
};