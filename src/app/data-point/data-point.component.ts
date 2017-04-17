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
  cities = ['Atl', 'Bos', 'SF'];
  types = ['1', '2'];
  validation = /^\d{5}$/;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private utilityService: UtilityService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    //TODO
    //this.cities =  this.utilityService.getCities();
    //this.types =  this.utilityService.getDataTypes();
  }

  submit() {
    this.model.datetime = this.model.date + " " + this.model.time;
    console.log(this.model);
    //this.router.navigate(["/login"]);
    //this.dataService.createDataPoint(this.model);
  }
}
