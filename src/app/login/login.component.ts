import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    model: any = {};

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit() {
        this.userService.logout();
    }

    login() {
        if (this.userService.login(this.model.username, this.model.password)) {
            this.router.navigate(["/home"]);
        } else {
            alert("wrong username/password");
        }
    }

}
