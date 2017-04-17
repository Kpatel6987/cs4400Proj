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
      //call to get cities
  }

  getDataTypes() {
      //call to get data types
  }

}
