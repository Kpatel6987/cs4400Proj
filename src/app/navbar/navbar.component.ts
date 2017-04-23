import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  showNavBar: boolean = false;
  userType;
  accepted;

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this.userService.showNavBarEmitter.subscribe((mode)=>{
      if (mode) {
        this.showNavBar = true;
      } else {
        if (this.userService.isAuthenticated()) {
            this.showNavBar = true;
        } else {
            this.showNavBar = false;
        }
      }
        
      });
      if (localStorage.getItem('approved') == 'false') {
        this.accepted = false;
      } else {
        this.accepted = true;
      }
      this.userType = localStorage.getItem('type');
  }


  logout() {
    this.userService.logout();
    this.userService.showNavBar(false);
    this.router.navigate(['/login']);
  }

}
