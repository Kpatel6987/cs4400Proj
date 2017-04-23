import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UtilityService } from '../_services/utility.service';
import { LocationService } from '../_services/location.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-poi-detail',
  templateUrl: './poi-detail.component.html'
})
export class PoiDetailComponent implements OnInit {

  model: any = {};
  location;
  displayTable = false;
  points;
  types;
  flagged: boolean = false;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private utilityService: UtilityService,
    private locationService: LocationService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.getFlag();
    this.types = this.utilityService.getDataTypes();
  }

  submit() {
    this.model.location = this.location;
    this.points = this.locationService.poiDetail(this.model);
    this.displayTable = true;
  }

  clear() {
    this.model = {};
    this.displayTable = false;
  }

  flag() {
    var obj = {location: this.location};
    this.locationService.setFlag(obj).subscribe(data => {
      alert("Success");
      this.getFlag();
      this.clear();
    }, err => alert("There was an error"));
  }

  removeFlag() {
    var locationObj = {location: this.location};
    this.locationService.removeFlag(locationObj).subscribe(data => {
      alert("Success");
      this.getFlag();
      this.clear();
    }, err => alert("There was an error"));
  }

  getFlag() {
    this.route.params.subscribe(params => {
        this.location =  params['name'];
        this.locationService.checkFlagged(params['name']).subscribe(data => 
        {
          if (data[0].Flag == "0") {
            this.flagged = false;
          } else {
            this.flagged = true;
          }
        });
    });
  }
}
