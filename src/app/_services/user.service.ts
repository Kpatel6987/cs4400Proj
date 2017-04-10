import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';


@Injectable()
export class UserService {

  private _showNavBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public showNavBarEmitter: Observable<boolean> = this._showNavBar.asObservable();

  constructor(
    private router: Router
  ) {}

  login(username: string, password: string) {
    if (username == "user123" && password == "password") {
        localStorage.setItem('user', username);
        return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('user');
  }

  isAuthenticated() {
    return localStorage.getItem('user') != null;
  }

  showNavBar(ifShow: boolean) {
    this._showNavBar.next(ifShow);
  }



}
