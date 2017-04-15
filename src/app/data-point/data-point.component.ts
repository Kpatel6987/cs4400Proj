import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-data-point',
  templateUrl: './data-point.component.html',
  styleUrls: ['./data-point.component.css']
})
export class DataPointComponent implements OnInit {

  model: any = {};
  ities = ['Atl', 'Bos', 'SF'];
  types = ['1', '2'];
  validation = /^\d{5}$/;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  submit() {
    //this.router.navigate(["/login"]);
    this.model.datetime = this.model.date + " " + this.model.time;
    console.log(this.model);
  }
}
