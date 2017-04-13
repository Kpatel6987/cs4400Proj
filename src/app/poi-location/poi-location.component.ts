import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-poi-location',
  templateUrl: './poi-location.component.html',
  styleUrls: ['./poi-location.component.css']
})
export class PoiLocationComponent implements OnInit {
  model: any = {};
  cities = ['Atl', 'Bos', 'SF'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  submit() {
    //this.router.navigate(["/login"]);
    console.log(this.model);
  }

}
