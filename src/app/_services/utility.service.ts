import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response } from '@angular/http';


@Injectable()
export class UtilityService {


  constructor(
    private router: Router,
    private http: Http
  ) {}

  getCities() {
      return this.http.get('/api/cityList').map((res:Response) => res.json());
  }

  getStates() {
      return this.http.get('/api/stateList').map((res:Response) => res.json());
  }

  getDataTypes() {
      return this.http.get('/api/typeList').map((res:Response) => res.json());
  }

  getLocations() {
      return this.http.get('/api/locationList').map((res:Response) => res.json());
  }

  checkCityState(city, state) {
      return this.http.get('/api/checkCityState?city='+ city + '&state='+state).map((res:Response) => res.json());
  }
}
