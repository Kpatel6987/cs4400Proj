import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-poi-detail',
  templateUrl: './poi-detail.component.html',
  styleUrls: ['./poi-detail.component.css']
})
export class PoiDetailComponent implements OnInit {

  model = {};
  
  constructor() { }

  ngOnInit() {
  }

  submit() {
    console.log(this.model);
  }

}
