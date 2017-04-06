import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AuthGuard } from './_guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: 'home', canActivate: [AuthGuard]}
];

export const routing = RouterModule.forRoot(appRoutes);
