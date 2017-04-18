import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response } from '@angular/http';


@Injectable()
export class LocationService {


  constructor(
    private router: Router,
    private http: Http
  ) {}

  createPoiLocation(model) {
    return this.http.post('api/addPOILocation', model, {}).map(res => res.json());
  }

}