import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-pending-accounts',
  templateUrl: './pending-accounts.component.html',
  styleUrls: ['./pending-accounts.component.css']
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
      console.log(data);
      alert("Success");
      this.router.navigate(['/home']);
    }); 
      
  }

  reject(account) {
    this.userService.rejectAccount(account).subscribe(data => {
      console.log(data);
      alert("Success");
      this.router.navigate(['/home']);
    }); 
  }
}
