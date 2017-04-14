import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response } from '@angular/http';


@Injectable()
export class UserService {

  private _showNavBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public showNavBarEmitter: Observable<boolean> = this._showNavBar.asObservable();

  constructor(
    private router: Router,
    private http: Http
  ) {}

  login(username: string, password: string) {
    return this.http.get('/api/getUser?username='+ username + '&password='+password).map((res:Response) => res.json());
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('type');
  }

  isAuthenticated() {
    return localStorage.getItem('user') != null && localStorage.getItem('user') != undefined;
  }

  showNavBar(ifShow: boolean) {
    this._showNavBar.next(ifShow);
  }

  register(model) {
    return this.http.post('api/addUser', model, {}).map(res => res.json());
  }



}
