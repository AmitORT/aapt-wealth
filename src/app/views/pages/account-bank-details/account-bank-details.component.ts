import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-bank-details',
  templateUrl: './account-bank-details.component.html',
  styleUrls: ['./account-bank-details.component.css']
})
export class AccountBankDetailsComponent implements OnInit {

  gendervalue:any;
  SecondaryBankAccount:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

}
