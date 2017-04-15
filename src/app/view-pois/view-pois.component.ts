import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-pois',
  templateUrl: './view-pois.component.html',
  styleUrls: ['./view-pois.component.css']
})
export class ViewPoisComponent implements OnInit {

  model: any = {};
  types = ['Mold', 'Air Quality'];
  
  constructor() { }

  ngOnInit() {
  }

  submit() {
    console.log(this.model);
  }
}
