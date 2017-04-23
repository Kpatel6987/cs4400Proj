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
    localStorage.removeItem('approved');
  }

  isAuthenticated() {
    return localStorage.getItem('user') != null && localStorage.getItem('user') != undefined;
  }

  showNavBar(ifShow: boolean) {
    this._showNavBar.next(ifShow);
  }

  register(model) {
    return this.http.post('api/addUser', model, {}).map(res => res.text());
  }

  registerCityOfficial(model) {
    return this.http.post('api/addCityOfficial', model, {}).map(res => res.json());
  }

  checkUser(username) {
    return this.http.get('/api/checkUser?username='+username).map((res:Response) => res.json());
  }

  checkCityOfficial(username) {
    return this.http.get('/api/checkCityOfficial?username='+username).map((res:Response) => res.json());
  }

  getPendingAccounts() {
    return this.http.get('/api/pendingAccounts').map((res:Response) => res.json());
  }

  acceptAccount(account) {
    return this.http.post('api/acceptAccount', account, {}).map(res => res.json());
  }

  rejectAccount(account) {
    return this.http.post('api/rejectAccount', account, {}).map(res => res.json());
  }  


}
