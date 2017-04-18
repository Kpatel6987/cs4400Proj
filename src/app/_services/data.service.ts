import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response } from '@angular/http';


@Injectable()
export class DataService {


  constructor(
    private router: Router,
    private http: Http
  ) {}

  createDataPoint(model) {
      return this.http.post('api/addDataPoint', model, {}).map(res => res.json());
  }

  getPendingPoints() {
    return this.http.get('/api/pendingDataPoints').map((res:Response) => res.json());
  }

  acceptPoint(point) {
    return this.http.post('api/acceptDataPoint', point).map(res => res.json());
  }

  rejectPoint(point) {
    return this.http.post('api/rejectDataPoint', point, {}).map(res => res.json());
  }  
}