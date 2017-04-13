import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AuthGuard } from './_guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DataPointComponent } from './data-point/data-point.component';
import { PoiLocationComponent } from './poi-location/poi-location.component';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'datapoint', component: DataPointComponent, canActivate: [AuthGuard] },
    { path: 'poilocation', component: PoiLocationComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', redirectTo: 'home', canActivate: [AuthGuard]}
];

export const routing = RouterModule.forRoot(appRoutes);
