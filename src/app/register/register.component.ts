import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';
import { UtilityService } from '../_services/utility.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  model: any = {};
  cities;
  states;
  types = ['City Official', 'City Scientist'];
  emailPattern = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$";
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.cities = this.utilityService.getCities();
    this.states = this.utilityService.getStates();
  }

  register() {
    if (this.model.password != this.model.confPassword) {
      alert("Passwords do not match");
      return false;
    }
    this.userService.register(this.model).subscribe(data => {
        alert(data);
        if (data == "Success") {
          this.router.navigate(["/login"]);
          this.model = {};
        }
      }, 
      err => console.log(err));
    
  }


}
