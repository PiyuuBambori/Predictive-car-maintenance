import { Application } from '@nativescript/core';
import { AuthService } from './services/auth.service';

const authService = new AuthService();
const startPage = authService.isAuthenticated() ? 'main-page' : 'pages/login/login-page';

Application.run({ moduleName: startPage });