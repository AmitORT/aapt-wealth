import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';
import { AescryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ValidateService } from 'src/app/services/validate/validate.service';
declare var $: any;

@Component({
  selector: 'app-redeem-funds',
  templateUrl: './redeem-funds.component.html',
  styleUrls: ['./redeem-funds.component.css']
})
export class RedeemFundsComponent implements OnInit {

  DisplayAccordion: boolean = false;
  Steps: number = 2;
  fund: any;


  SelectedMutualFund: any;
  MyHoldings: any;
  MyHoldingsProductOverviewDetails: any;
  MyGoals: any;
  Redeemcart: any = {
    'instrumentId': '',
    'redeemFromGoal': 0,
    'goalId': '',
    'myHoldingCurrentValue': '',
    'myHoldingUnitsOwned': '',
    'sellType': 'Amount',
    'totalAmount': '',
    'quantity': '',
    'serviceProviderAccountId': '',
    'isAllUnits': '',
    'remainingUnits':0,
    "modeOfTransaction": 2,
    "transactionSubType": 1,
    "transactionTypeId": 3,

    'isActive': 1
  }

  RedeemCartItemList: any = [];

  constructor(public route: Router, private toastr: ToastrService, public validate: ValidateService, private crypto: AescryptoService, private api: ApiService) { }

  ngOnInit(): void {

    this.GetMyHoldings();
    this.GetMyGoals();

    if (localStorage.getItem("SelectedMutualFund") != null) {
      this.SelectedMutualFund = this.crypto.Decrypt(localStorage.getItem("SelectedMutualFund"))
      console.log("SelectedMutualFund", this.SelectedMutualFund);
      this.GetMyHoldingsProductOverview();
    }



    $(".body-color").scroll(function () {
      if ($(".body-color").scrollTop() > 150) {
        $('#sidebar').css('position', 'fixed');
        $('#sidebar').css('top', '5%');
        $('#sidebar').css('width', $("#sidebar-main").width() + 'px');
      }

      else if ($(".body-color").scrollTop() <= 150) {
        $('#sidebar').css('position', '');
        $('#sidebar').css('top', '');
        $('#sidebar').css('width', '');
      }

      if ($('#sidebar').offset().top + $("#sidebar").height() > $("#footer").offset().top - 100) {
        $('#sidebar').css('top', -($("#sidebar").offset().top + $("#sidebar").height() - $("#footer").offset().top + 100));
      }
    });
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
  EmptyRedeemCart() {
    this.Redeemcart = {
      'instrumentId': '',
      'redeemFromGoal': 0,
      'goalId': '',
      'myHoldingCurrentValue': this.MyHoldingsProductOverviewDetails.holdingData.totalCurrentValue,
      'myHoldingUnitsOwned': this.MyHoldingsProductOverviewDetails.holdingData.quantity,
      'sellType': 'Amount',
      'totalAmount': '',
      'quantity': '',
      'serviceProviderAccountId': '',
      'isAllUnits': '',
      'remainingUnits':0,
      "modeOfTransaction": 2,
      "transactionSubType": 1,
      "transactionTypeId": 3,
      'isActive': 0
    }
  }

  GetMyHoldingsProductOverview() {
    var orderby = [{ "name": "weight", "sort": "DESC" }];
    var searchFilter = { 'productId': 5 };
    var whereClause = {};
    var postData = new FormData();
    postData.append("instrumentId", this.SelectedMutualFund.id);
    postData.append("limit", "10");
    postData.append("offset", "0");
    postData.append("holdinglimit", "10");
    postData.append("orderBy", JSON.stringify(orderby));
    postData.append("whereClause", JSON.stringify(searchFilter));
    postData.append("searchFilter", JSON.stringify(whereClause));
    postData.append("searchlimit", "5000");
    this.api.post("switchRedeemFunds/myholdings-product-overview", postData).subscribe(response => {
      console.log('GetMyHoldingsProductOverview', response);
      if (response.response.n == 1) {
        this.MyHoldingsProductOverviewDetails = response.data;
        this.GetRedeemCart();
      }
      else {
        this.toastr.error(response.response.Msg);
      }
    })
  }

  GetRedeemCart() {
    this.Redeemcart.instrumentId = this.SelectedMutualFund.id;
    this.Redeemcart.myHoldingCurrentValue = this.MyHoldingsProductOverviewDetails.holdingData.totalCurrentValue;
    this.Redeemcart.myHoldingUnitsOwned = this.MyHoldingsProductOverviewDetails.holdingData.quantity;
    this.Redeemcart.sellType = this.SelectedMutualFund.RedeemSwitchFund.sellType;
    this.Redeemcart.totalAmount = this.SelectedMutualFund.RedeemSwitchFund.totalAmount;
    this.Redeemcart.quantity = this.SelectedMutualFund.RedeemSwitchFund.quantity;
    this.Redeemcart.serviceProviderAccountId = this.SelectedMutualFund.serviceProviderId;

    this.RedeemCartItemList.push(this.Redeemcart);
    this.EmptyRedeemCart();
  }

  Checked(id: any, i: any) {
    if ($("#" + id).is(":checked")) {
      this.RedeemCartItemList[i].redeemFromGoal = 1;
    }
    else {
      this.RedeemCartItemList[i].redeemFromGoal = 0;
      this.RedeemCartItemList[i].goalId = '';
    }
  }

  AddNewInstrument() {
    this.EmptyRedeemCart();
    this.RedeemCartItemList.push(this.Redeemcart);
    for (let i = 0; i < this.RedeemCartItemList.length; i++) {
      this.RedeemCartItemList[i].isActive = 0;
    }
    var length = this.RedeemCartItemList.length - 1;
    this.RedeemCartItemList[length].isActive = 1;
    this.scrolltotop();
  }

  GetAmountAndUnit(i: any) {
    if (this.RedeemCartItemList[i].sellType == 'Amount' && this.validate.isNullEmptyUndefined(this.RedeemCartItemList[i].totalAmount)) {
      this.toastr.error('Please enter amount');
    }
    else if (this.RedeemCartItemList[i].sellType == 'Unit' && this.validate.isNullEmptyUndefined(this.RedeemCartItemList[i].quantity)) {
      this.toastr.error('Please enter unit');
    }
    else {
      var postData = new FormData();
      postData.append("instrumentId", this.RedeemCartItemList[i].instrumentId);
      postData.append("Type", this.RedeemCartItemList[i].sellType);
      postData.append("Amount", this.RedeemCartItemList[i].totalAmount);
      postData.append("Unit", this.RedeemCartItemList[i].quantity);

      this.api.post("switchRedeemFunds/calculate-amount-unit", postData).subscribe(response => {
        console.log(response);
        if (response.response.n == 1) {
          this.RedeemCartItemList[i].totalAmount = response.data.calculateAmount;
          this.RedeemCartItemList[i].quantity = response.data.calculateUnit;
          this.RedeemCartItemList[i].remainingUnits = response.data.remainingUnit;
        }
      })
    }
  }




























  NextStep() {
    this.Steps++;
  }

  scrolltotop() {
    $('.body-color').animate({
      scrollTop: 0
    }, 0);
  }

  ShowAccordion() {
    // this.DisplayAccordion = true;
    // $("#collapseOne").collapse('hide');
    // $("#collapseTwo").collapse('show');
  }

  RedeemNow() {
    this.route.navigate(["/order-placed"]);
  }




}
