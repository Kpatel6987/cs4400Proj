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
        console.log(data);
        if (data.length == 0) {
          this.userService.register(this.model).subscribe(
            data => console.log(data),
            () => {
              this.model = {};
              alert("Success");
              this.router.navigate(["/login"]);
            }
          );
        } else {
            alert("That username already exists");
        }
      });
    
  }

}
