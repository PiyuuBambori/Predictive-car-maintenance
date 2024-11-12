import { Observable } from '@nativescript/core';
import { ApplicationSettings } from '@nativescript/core';

export class AuthService extends Observable {
    private readonly AUTH_KEY = 'isAuthenticated';
    private readonly USER_KEY = 'userData';

    constructor() {
        super();
    }

    async login(email: string, password: string): Promise<boolean> {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                // For demo purposes, accept any non-empty email/password
                if (email && password) {
                    const userData = {
                        email,
                        name: 'Demo User',
                        lastLogin: new Date().toISOString()
                    };
                    
                    ApplicationSettings.setBoolean(this.AUTH_KEY, true);
                    ApplicationSettings.setString(this.USER_KEY, JSON.stringify(userData));
                    resolve(true);
                } else {
                    resolve(false);
                }
            }, 1000);
        });
    }

    logout(): void {
        ApplicationSettings.remove(this.AUTH_KEY);
        ApplicationSettings.remove(this.USER_KEY);
    }

    isAuthenticated(): boolean {
        return ApplicationSettings.getBoolean(this.AUTH_KEY, false);
    }

    getUserData(): any {
        const userData = ApplicationSettings.getString(this.USER_KEY);
        return userData ? JSON.parse(userData) : null;
    }
}