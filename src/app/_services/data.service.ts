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
    //call to get the pending points
  }

  acceptPoint(point) {
    //accept point
  }

  rejectPointt(point) {
    //reject point
  }  
}