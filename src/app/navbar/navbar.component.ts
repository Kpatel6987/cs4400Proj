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

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this.userService.showNavBarEmitter.subscribe((mode)=>{
        if (this.userService.isAuthenticated()) {
            this.showNavBar = true;
        } else {
            this.showNavBar = false;
        }
      });
  }


  logout() {
    this.userService.logout();
    this.userService.showNavBar(false);
    this.router.navigate(['/login']);
  }

}
