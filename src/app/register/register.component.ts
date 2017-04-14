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
    this.userService.register(this.model).subscribe(
      data => console.log(data),
      err => alert(err),
      () => {
        this.model = {};
        alert("Success");
        this.router.navigate(["/login"]);
      }
    );
  }

}
