import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, BaseRequestOptions } from '@angular/http';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './_guards/auth.guard';
import { UserService } from './_services/user.service';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DataPointComponent } from './data-point/data-point.component';
import { PoiLocationComponent } from './poi-location/poi-location.component';
import { PendingDataPointsComponent } from './pending-data-points/pending-data-points.component';
import { PendingAccountsComponent } from './pending-accounts/pending-accounts.component';
import { ViewPoisComponent } from './view-pois/view-pois.component';
import { PoiDetailComponent } from './poi-detail/poi-detail.component';
import { PoiReportComponent } from './poi-report/poi-report.component';
import { ChooseFunctionalityComponent } from './choose-functionality/choose-functionality.component';
import { UtilityService } from './_services/utility.service';
import { DataService } from './_services/data.service';
import { LocationService } from './_services/location.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    DataPointComponent,
    PoiLocationComponent,
    PendingDataPointsComponent,
    PendingAccountsComponent,
    ViewPoisComponent,
    PoiDetailComponent,
    PoiReportComponent,
    ChooseFunctionalityComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    AuthGuard,
    UserService,
    UtilityService,
    DataService,
    LocationService,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
