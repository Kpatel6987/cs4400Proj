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
    user;

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit() {
        this.userService.logout();
    }

    login() {        
        this.userService.login(this.model.username, this.model.password)
        .subscribe(data => 
            {
                //console.log(data);
                if (data.length == 0 || data[0].Username == null || data[0].Username == undefined) {
                    alert("Invalid Username/ Password combination");
                } else {
                    if (data[0].UserType == "City Official") {
                        this.userService.checkCityOfficial(data[0].Username).subscribe(d => {
                            if (d[0].Approved == null) {
                                alert("Account has been rejected");
                            } else {
                                this.userService.showNavBar(true);
                                this.router.navigate(["/home"]);
                                localStorage.setItem('user', data[0].Username);
                                localStorage.setItem('type', data[0].UserType);
                                if (d[0].Approved == false)
                                    localStorage.setItem('approved', 'false');
                                else 
                                    localStorage.setItem('approved', 'true');
                            }
                        })
                    } else {
                        this.userService.showNavBar(true);
                        this.router.navigate(["/home"]);
                        localStorage.setItem('user', data[0].Username);
                        localStorage.setItem('type', data[0].UserType);
                    }
                }
               
            });
    }

}
