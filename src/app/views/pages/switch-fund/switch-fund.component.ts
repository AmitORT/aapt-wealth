import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';
import { AescryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ValidateService } from 'src/app/services/validate/validate.service';
declare var $: any;

@Component({
  selector: 'app-switch-fund',
  templateUrl: './switch-fund.component.html',
  styleUrls: ['./switch-fund.component.css']
})
export class SwitchFundComponent implements OnInit {

  DisplayAccordion: boolean = false;


  SwitchLoader: boolean = true;
  SelectedMutualFund: any;
  MyHoldings: any;
  MyHoldingsProductOverviewDetails: any;
  MyGoals: any;

  Switchcart: any = {
    'instrumentId': '',
    'goalId': '',
    'SwitchFromGoal': 0,
    'myHoldingCurrentValue': '',
    'myHoldingUnitsOwned': '',
    'sellType': 'Amount',
    'totalAmount': '',
    'quantity': '',
    'secondaryInstrumentId':'',
    'secondaryGoalId':'',
    'serviceProviderAccountId': '',
    'isAllUnits': '',
    'fullSwitch':'',
    'remainingUnits': 0,
    'modeOfTransaction': 3,
    "transactionSubType": 1,
    "transactionTypeId": 11,
    'isActive': 1

  }
  SwitchCartItemList: any = [
    {
      'isActive': 1
    },
    {
      'isActive': 0
    }
  ];

  constructor(public route: Router, private toastr: ToastrService, public validate: ValidateService, private crypto: AescryptoService, private api: ApiService) { }

  ngOnInit(): void {

    this.GetMyHoldings();
    this.GetMyGoals();

    if (localStorage.getItem("SelectedMutualFund") != null) {
      this.SelectedMutualFund = this.crypto.Decrypt(localStorage.getItem("SelectedMutualFund"))
      console.log("SelectedMutualFund", this.SelectedMutualFund);
    }

  }

  scrolltotop() {
    $('.body-color').animate({
      scrollTop: 0
    }, 0);
  }

  GetMyHoldings() {
    this.api.get("switchRedeemFunds/myholdings", true).subscribe(response => {
      if (response.response.n == 1) {
        this.MyHoldings = response.data;
        console.log('MyHoldings', this.MyHoldings)
      }
    })
  }

  GetMyGoals() {
    this.api.get("goalDetails/create-goal", true).subscribe(resp => {
      if (resp.response.n == 1) {
        this.MyGoals = resp.data;
        console.log("my goals", this.MyGoals);
      }
    })
  }
























}
