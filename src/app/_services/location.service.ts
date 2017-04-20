import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response, URLSearchParams, QueryEncoder } from '@angular/http';


@Injectable()
export class LocationService {


  constructor(
    private router: Router,
    private http: Http
  ) {}

  createPoiLocation(model) {
    return this.http.post('api/addPOILocation', model, {}).map(res => res.json());
  }

  filterPOIs(model) {
    let params: URLSearchParams = new URLSearchParams();
    if (model.location != null)
      params.set('LocationName', model.location);
    if (model.city != null)
      params.set('City', model.city);
    if (model.zipcode != null)
      params.set('ZipCode', model.zipcode);
    if (model.flagged != null)
      params.set('Flag', model.flagged);
    if (model.dateFrom != null)
      params.set('dateFrom', model.dateFrom);
    if (model.dateTo != null)
      params.set('dateTo', model.dateTo);
    return this.http.get('api/filterPOIs', {search: params}).map((res:Response) => res.json());
  }

  poiDetail(model) {
    let params: URLSearchParams = new URLSearchParams();
    if (model.location != null)
      params.set('LocationName', model.location);
    if (model.dataType != null)
      params.set('Type', model.dataType);
    if (model.valueFrom != null)
      params.set('valueFrom', model.valueFrom);
    if (model.valueTo != null)
      params.set('valueTo', model.valueTo);
    if (model.dateFrom != null)
      params.set('dateFrom', model.dateFrom);
    if (model.dateTo != null)
      params.set('dateTo', model.dateTo);
    return this.http.get('api/poiDetail', {search: params}).map((res:Response) => res.json());
  }

  checkFlagged(location:string) {
    return this.http.get('/api/checkFlagged?location='+ location).map((res:Response) => res.json());
  }

  setFlag(model) {
    return this.http.post('api/flagPoi', model, {}).map(res => res.json());
  }

  removeFlag(location) {
    return this.http.post('api/removeFlag', location, {}).map(res => res.json());
  }
}