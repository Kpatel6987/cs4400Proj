import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

// Site nav
import { AuthGuard } from './_guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

// Pois & Data
import { PoiLocationComponent } from './poi-location/poi-location.component';
import { PoiDetailComponent } from './poi-detail/poi-detail.component';
import { ViewPoisComponent } from './view-pois/view-pois.component';
import { DataPointComponent } from './data-point/data-point.component';
import { PoiReportComponent } from './poi-report/poi-report.component';
import { PoiListComponent } from './poi-list/poi-list.component';

// Pending
import { PendingAccountsComponent } from './pending-accounts/pending-accounts.component';
import { PendingDataPointsComponent } from './pending-data-points/pending-data-points.component';


const appRoutes: Routes = [
    { path: 'poilocation', component: PoiLocationComponent, canActivate: [AuthGuard] },
    { path: 'datapoint', component: DataPointComponent, canActivate: [AuthGuard] },
    
    { path: 'poilist', component: PoiListComponent, canActivate: [AuthGuard] },
    { path: 'poidetail/:name', component: PoiDetailComponent, canActivate: [AuthGuard] },
    { path: 'viewpois', component: ViewPoisComponent, canActivate: [AuthGuard] },
    { path: 'poireport', component: PoiReportComponent, canActivate: [AuthGuard] },

    { path: 'pendingaccounts', component: PendingAccountsComponent, canActivate: [AuthGuard] },
    { path: 'pendingdatapoints', component: PendingDataPointsComponent, canActivate: [AuthGuard] },

    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', redirectTo: 'home', canActivate: [AuthGuard]}
];

export const routing = RouterModule.forRoot(appRoutes);
