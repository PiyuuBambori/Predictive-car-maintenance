import Database from 'better-sqlite3';

const db = new Database('car_maintenance.db');

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create users table
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME
  )
`);

// Create vehicles table
db.exec(`
  CREATE TABLE IF NOT EXISTS vehicles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    year INTEGER NOT NULL,
    vin TEXT UNIQUE,
    current_mileage INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`);

// Create maintenance_records table
db.exec(`
  CREATE TABLE IF NOT EXISTS maintenance_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vehicle_id INTEGER NOT NULL,
    service_type TEXT NOT NULL,
    description TEXT,
    mileage INTEGER NOT NULL,
    service_date DATETIME NOT NULL,
    next_service_date DATETIME,
    cost DECIMAL(10,2),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
  )
`);

// Create vehicle_health table
db.exec(`
  CREATE TABLE IF NOT EXISTS vehicle_health (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vehicle_id INTEGER NOT NULL,
    engine_health INTEGER NOT NULL,
    oil_life INTEGER NOT NULL,
    battery_health INTEGER NOT NULL,
    tire_health INTEGER NOT NULL,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
  )
`);

// Create maintenance_alerts table
db.exec(`
  CREATE TABLE IF NOT EXISTS maintenance_alerts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vehicle_id INTEGER NOT NULL,
    component TEXT NOT NULL,
    severity TEXT CHECK(severity IN ('low', 'medium', 'high')) NOT NULL,
    message TEXT NOT NULL,
    due_date DATETIME NOT NULL,
    resolved BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
  )
`);

// Insert sample data
const insertUser = db.prepare(`
  INSERT OR IGNORE INTO users (email, password_hash, name)
  VALUES (?, ?, ?)
`);

const insertVehicle = db.prepare(`
  INSERT OR IGNORE INTO vehicles (user_id, make, model, year, vin, current_mileage)
  VALUES (?, ?, ?, ?, ?, ?)
`);

const insertHealth = db.prepare(`
  INSERT OR IGNORE INTO vehicle_health (vehicle_id, engine_health, oil_life, battery_health, tire_health)
  VALUES (?, ?, ?, ?, ?)
`);

const insertAlert = db.prepare(`
  INSERT OR IGNORE INTO maintenance_alerts (vehicle_id, component, severity, message, due_date)
  VALUES (?, ?, ?, ?, ?)
`);

// Begin transaction
const transaction = db.transaction(() => {
  // Add demo user
  const userId = insertUser.run(
    'demo@example.com',
    'hashed_password_here',
    'Demo User'
  ).lastInsertRowid;

  // Add demo vehicle
  const vehicleId = insertVehicle.run(
    userId,
    'Toyota',
    'Camry',
    2020,
    'ABC123XYZ',
    25000
  ).lastInsertRowid;

  // Add vehicle health data
  insertHealth.run(vehicleId, 92, 65, 95, 88);

  // Add maintenance alerts
  const alerts = [
    ['Oil Change', 'medium', 'Oil change recommended within next 1000 miles', '2024-04-01'],
    ['Tire Rotation', 'low', 'Tire rotation recommended', '2024-04-15'],
    ['Brake Inspection', 'high', 'Brake pads showing significant wear', '2024-03-30']
  ];

  alerts.forEach(([component, severity, message, dueDate]) => {
    insertAlert.run(vehicleId, component, severity, message, dueDate);
  });
});

// Execute transaction
transaction();

console.log('Database setup completed successfully!');