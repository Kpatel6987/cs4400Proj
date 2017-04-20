import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UtilityService } from '../_services/utility.service';
import { LocationService } from '../_services/location.service';

@Component({
  selector: 'app-poi-detail',
  templateUrl: './poi-detail.component.html',
  styleUrls: ['./poi-detail.component.css']
})
export class PoiDetailComponent implements OnInit {

  model: any = {};
  location;
  displayTable = false;
  points;
  types;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private utilityService: UtilityService,
    private locationService: LocationService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
        this.location =  params['name'];
    });
    this.types = this.utilityService.getDataTypes();
  }

  submit() {
    this.model.location = this.location;
    console.log(this.model);
    this.points = this.locationService.poiDetail(this.model);
    this.displayTable = true;
  }

  clear() {
    this.model = {};
    this.displayTable = false;
  }
}
