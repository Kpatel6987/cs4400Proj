import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-pending-accounts',
  templateUrl: './pending-accounts.component.html'
})
export class PendingAccountsComponent implements OnInit {

  accounts;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.accounts = this.userService.getPendingAccounts();
  }

  accept(account) {
    this.userService.acceptAccount(account).subscribe(data => {
      this.accounts = this.userService.getPendingAccounts();
    }); 
      
  }

  reject(account) {
    this.userService.rejectAccount(account).subscribe(data => {
      this.accounts = this.userService.getPendingAccounts();
    }); 
  }
}
