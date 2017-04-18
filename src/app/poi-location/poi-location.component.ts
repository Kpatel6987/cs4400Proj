import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';
import { UtilityService } from '../_services/utility.service';
import { LocationService } from '../_services/location.service';

@Component({
  selector: 'app-poi-location',
  templateUrl: './poi-location.component.html',
  styleUrls: ['./poi-location.component.css']
})
export class PoiLocationComponent implements OnInit {
  model: any = {};
  cities;
  states;
  validation = /^\d{5}$/;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private utilityService: UtilityService,
    private locationService: LocationService
  ) { }

  ngOnInit() {
    this.cities =  this.utilityService.getCities();
    this.states =  this.utilityService.getStates();
  }

  submit() {
    

    this.utilityService.checkCityState(this.model.city, this.model.state).subscribe(data =>
      {
        if (data.length > 0) {
          this.locationService.createPoiLocation(this.model).subscribe(data => {
            this.model = {};
            alert("Success");
            this.router.navigate(["/home"]);
          },
          err => alert("That name is already in use")
          );
        } else {
            alert("That is not a valid City State Combination");
        }
      });
  }

}
