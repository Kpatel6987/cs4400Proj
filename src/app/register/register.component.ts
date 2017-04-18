import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};
  cities = ['Atl', 'Bos', 'SF'];
  states = ['GA', 'FL', 'CA'];
  types = ['City Official', 'City Scientist'];
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  register() {
    if (this.model.password != this.model.confPassword) {
      alert("Passwords do not match");
      return false;
    }
    this.userService.checkUser(this.model.username).subscribe(data =>
      {
        if (data.length == 0) {
          this.userService.register(this.model).subscribe(
            data => {
              this.addCityOfficial(this.model);
              this.model = {};
              alert("Success");
              this.router.navigate(["/login"]);
            },
            err => alert("That email already exists")
          );
        } else {
            alert("That username already exists");
        }
      });
  }

  addCityOfficial(model) {
    this.userService.registerCityOfficial(model).subscribe(err => console.log("There was an error"));
  }

}
