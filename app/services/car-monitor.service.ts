import { Observable } from '@nativescript/core';
import { CarData, MaintenanceAlert } from '../models/car-data.model';

export class CarMonitorService extends Observable {
    constructor() {
        super();
    }

    async getCarData(): Promise<CarData> {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    engineHealth: 92,
                    oilLife: 65,
                    tireHealth: 88,
                    batteryHealth: 95,
                    mileage: 25000,
                    nextService: new Date(2024, 5, 15)
                });
            }, 1000);
        });
    }

    async getAlerts(): Promise<MaintenanceAlert[]> {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                const alerts: MaintenanceAlert[] = [
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
                ];
                resolve(alerts);
            }, 800);
        });
    }
}