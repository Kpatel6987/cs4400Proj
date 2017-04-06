import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';



@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private userService: UserService
    ) { }

    canActivate() {
      if (!this.userService.isAuthenticated()) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }
}
