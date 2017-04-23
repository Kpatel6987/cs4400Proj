import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  userType;
  accepted: boolean;
  
  constructor() { }

  ngOnInit() {
    this.userType = localStorage.getItem('type');
    if (localStorage.getItem('approved') == 'false') {
      this.accepted = false;
    } else {
      this.accepted = true;
    }
  }

}
