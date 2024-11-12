export interface CarData {
    engineHealth: number;
    oilLife: number;
    tireHealth: number;
    batteryHealth: number;
    mileage: number;
    nextService: Date;
}

export interface MaintenanceAlert {
    component: string;
    severity: 'low' | 'medium' | 'high';
    message: string;
    dueDate: Date;
}