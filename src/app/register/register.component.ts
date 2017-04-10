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
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit() {
  }

  register() {
    if (this.model.password != this.model.confPassword) {
      alert("Passwords do not match");
      return false;
    }
    alert("LOL");
    //this.router.navigate(["/login"]);
    console.log(this.model);
  }

}
