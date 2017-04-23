import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';
import { UtilityService } from '../_services/utility.service';
import { DataService } from '../_services/data.service';


@Component({
  selector: 'app-data-point',
  templateUrl: './data-point.component.html',
  styleUrls: ['./data-point.component.css']
})
export class DataPointComponent implements OnInit {

  model: any = {};
  types;
  locations;
  validation = /^\d{5}$/;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private utilityService: UtilityService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.types =  this.utilityService.getDataTypes();
    this.locations =  this.utilityService.getLocations();
  }

  submit() {
    this.model.datetime = this.model.date + " " + this.model.time;
    this.dataService.createDataPoint(this.model).subscribe(data => {
      this.model = {};
      alert("Success");
      this.router.navigate(["/home"]);
    },
    err => alert("A data point at this time and location has already been created")
    );
  }
}
