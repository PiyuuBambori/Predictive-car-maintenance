import { Observable, Frame } from '@nativescript/core';
import { CarMonitorService } from './services/car-monitor.service';
import { AuthService } from './services/auth.service';
import { CarData, MaintenanceAlert } from './models/car-data.model';

export class MainViewModel extends Observable {
    private _carMonitorService: CarMonitorService;
    private _authService: AuthService;
    private _carData: CarData;
    private _alerts: MaintenanceAlert[];
    private _isLoading: boolean = false;
    private _userName: string = '';
    private _lastLoginDate: string = '';

    constructor() {
        super();
        this._carMonitorService = new CarMonitorService();
        this._authService = new AuthService();
        
        // Load user data
        const userData = this._authService.getUserData();
        if (userData) {
            this._userName = userData.name;
            this._lastLoginDate = new Date(userData.lastLogin).toLocaleString();
        }

        this.loadCarData();
    }

    private async loadCarData() {
        this.isLoading = true;
        try {
            this._carData = await this._carMonitorService.getCarData();
            this._alerts = await this._carMonitorService.getAlerts();
            
            this.notifyPropertyChange('carData', this._carData);
            this.notifyPropertyChange('alerts', this._alerts);
        } catch (error) {
            console.error('Error loading car data:', error);
            alert({
                title: 'Error',
                message: 'Failed to load car data. Please try again.',
                okButtonText: 'OK'
            });
        } finally {
            this.isLoading = false;
        }
    }

    get carData(): CarData {
        return this._carData;
    }

    get alerts(): MaintenanceAlert[] {
        return this._alerts;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    set isLoading(value: boolean) {
        if (this._isLoading !== value) {
            this._isLoading = value;
            this.notifyPropertyChange('isLoading', value);
        }
    }

    get userName(): string {
        return this._userName;
    }

    get lastLoginDate(): string {
        return this._lastLoginDate;
    }

    get nextServiceDate(): string {
        return this._carData?.nextService.toLocaleDateString() || 'Not scheduled';
    }

    async scheduleService() {
        alert({
            title: "Schedule Service",
            message: "This would integrate with your local service center.",
            okButtonText: "OK"
        });
    }

    async onLogout() {
        this._authService.logout();
        Frame.topmost().navigate({
            moduleName: 'pages/login/login-page',
            clearHistory: true
        });
    }

    async refreshData() {
        await this.loadCarData();
    }
}