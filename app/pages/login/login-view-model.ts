import { Observable } from '@nativescript/core';
import { Frame } from '@nativescript/core';
import { AuthService } from '../../services/auth.service';

export class LoginViewModel extends Observable {
    private _email: string = '';
    private _password: string = '';
    private _isLoading: boolean = false;
    private _authService: AuthService;

    constructor() {
        super();
        this._authService = new AuthService();
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        if (this._email !== value) {
            this._email = value;
            this.notifyPropertyChange('email', value);
        }
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        if (this._password !== value) {
            this._password = value;
            this.notifyPropertyChange('password', value);
        }
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

    async onSignIn() {
        if (!this._email || !this._password) {
            alert({
                title: 'Error',
                message: 'Please enter both email and password',
                okButtonText: 'OK'
            });
            return;
        }

        this.isLoading = true;
        try {
            const success = await this._authService.login(this._email, this._password);
            if (success) {
                Frame.topmost().navigate({
                    moduleName: 'main-page',
                    clearHistory: true
                });
            } else {
                alert({
                    title: 'Login Failed',
                    message: 'Invalid email or password',
                    okButtonText: 'OK'
                });
            }
        } catch (error) {
            alert({
                title: 'Error',
                message: 'An error occurred during login',
                okButtonText: 'OK'
            });
        } finally {
            this.isLoading = false;
        }
    }

    onForgotPassword() {
        alert({
            title: 'Reset Password',
            message: 'Please contact support to reset your password',
            okButtonText: 'OK'
        });
    }
}