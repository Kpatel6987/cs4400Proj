import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../_services/utility.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LocationService } from '../_services/location.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-pois',
  templateUrl: './view-pois.component.html'
})
export class ViewPoisComponent implements OnInit {

  model: any = {};
  cities;
  locations;
  pois;
  displayTable = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private utilityService: UtilityService,
    private locationService: LocationService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.cities = this.utilityService.getCities();
    this.locations = this.utilityService.getLocations();
  }

  submit() {
    this.pois = this.locationService.filterPOIs(this.model);
    this.displayTable = true;
  }

  isFlagged(poi) :string{
    return poi.Flag ? "glyphicon glyphicon-flag" : "";
  }

  clear() {
    this.model = {};
    this.displayTable = false;
  }
}
