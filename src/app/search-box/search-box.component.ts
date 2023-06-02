import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/utils/services/account.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  firstName: string = '';
  lastName: string = '';
  dni: string = '';
  accountNumber: string = '';
  accountAmount: string = '';
  userAccounts: any = [];
  accountHistory: any = [];

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.accountService.getUserAccount().subscribe((res) => {
      console.log(res);
      this.firstName = res.firstName;
      this.lastName = res.lastName;
      this.dni = res.dni;
      this.accountNumber = res.accounts[0].accountNumber;
      this.accountAmount = res.accounts[0].amount;
      this.userAccounts = res.accounts;
      sessionStorage.setItem('amount', this.accountAmount);
      sessionStorage.setItem('accountNumber', this.accountNumber);
      this.getAccountHistory();
    });

  }

  getAccountHistory() {
    this.accountService.getAccountHistory(this.accountNumber).subscribe((res) => {
      console.log(res);
      this.accountHistory = res;
    });
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

}
