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
  SchemeList: any;

  Switchcart: any = {
    'instrumentId': '',
    'goalId': '', //1st
    'SwitchFromGoal': 0,
    'myHoldingCurrentValue': '',
    'myHoldingUnitsOwned': '',
    'sellType': 'Amount',
    'totalAmount': '',
    'quantity': '',
    'secondaryInstrumentId': '', //2nd to sceme
    'secondaryGoalId': '', //2nd
    'serviceProviderAccountId': '',
    'isAllUnits': '',
    'fullSwitch': '',
    'remainingUnits': 0,
    'isActive': 1,
    'modeOfTransaction': 3,
    'transactionSubType': 1,
    'transactionTypeId': 11,
    'schemeList': []

  }
  SwitchCartItemList: any = [];

  constructor(public route: Router, private toastr: ToastrService, public validate: ValidateService, private crypto: AescryptoService, private api: ApiService) { }

  ngOnInit(): void {

    this.GetMyHoldings();
    this.GetMyGoals();

    if (localStorage.getItem("SelectedMutualFund") != null) {
      this.SelectedMutualFund = this.crypto.Decrypt(localStorage.getItem("SelectedMutualFund"))
      console.log("SelectedMutualFund", this.SelectedMutualFund);
      this.GetMyHoldingsProductOverview(0, this.SelectedMutualFund.id);
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

  EmptySwitchCart() {
    this.Switchcart = {
      'instrumentId': '',
      'goalId': '',
      'SwitchFromGoal': 0,
      'myHoldingCurrentValue': '',
      'myHoldingUnitsOwned': '',
      'sellType': 'Amount',
      'totalAmount': '',
      'quantity': '',
      'secondaryInstrumentId': '',
      'secondaryGoalId': '',
      'serviceProviderAccountId': '',
      'isAllUnits': '',
      'fullSwitch': '',
      'remainingUnits': 0,
      'isActive': 0,
      'modeOfTransaction': 3,
      'transactionSubType': 1,
      'transactionTypeId': 11,
      'schemeList': []
    }
  }

  GetSchemeList(i: any) {
    var postData = new FormData();
    postData.append("serviceProviderId", this.SwitchCartItemList[i].serviceProviderAccountId);
    postData.append("switchType", 'switch');
    this.api.post("switchRedeemFunds/fetch-instruments", postData, true).subscribe(response => {
      console.log('GetSchemeList', response.data)
      if (response.response.n == 1) {
        this.SwitchCartItemList[i].schemeList = response.data;
      }
    })

  }

  GetMyHoldingsProductOverview(i: any, instrumentId: any) {

    var orderby = [{ "name": "weight", "sort": "DESC" }];
    var searchFilter = { 'productId': 5 };
    var whereClause = {};
    var postData = new FormData();
    postData.append("instrumentId", instrumentId);
    postData.append("limit", "10");
    postData.append("offset", "0");
    postData.append("holdinglimit", "10");
    postData.append("orderBy", JSON.stringify(orderby));
    postData.append("whereClause", JSON.stringify(whereClause));
    postData.append("searchFilter", JSON.stringify(searchFilter));
    postData.append("searchlimit", "5000");
    this.api.post("switchRedeemFunds/myholdings-product-overview", postData).subscribe(response => {
      console.log('GetMyHoldingsProductOver view', response);
      if (response.response.n == 1) {

        if (this.SwitchLoader) {
          this.MyHoldingsProductOverviewDetails = response.data;
          this.GetAmountUnitDetail();
        }
        else {
          // this.SwitchCartItemList[i].myHoldingCurrentValue = response.data.holdingData.totalCurrentValue;
          // this.SwitchCartItemList[i].myHoldingUnitsOwned = response.data.holdingData.quantity;
          this.SwitchCartItemList[i].serviceProviderAccountId = response.data.productOverview.serviceProviderId;
          this.GetSchemeList(i);
          this.GetSellableAmounts(i, instrumentId, this.SwitchCartItemList[i].serviceProviderAccountId)
        }
      }
      else {
        this.toastr.error(response.response.Msg);
      }
    })
  }

  GetAmountUnitDetail() {
    var postData = new FormData();
    postData.append("instrumentId", this.SelectedMutualFund.id);
    postData.append("Type", this.SelectedMutualFund.RedeemSwitchFund.sellType);
    postData.append("Amount", this.SelectedMutualFund.RedeemSwitchFund.totalAmount);
    postData.append("Unit", this.SelectedMutualFund.RedeemSwitchFund.quantity);

    this.api.post("switchRedeemFunds/calculate-amount-unit", postData).subscribe(response => {
      console.log('calculate-amount-unit', response);
      if (response.response.n == 1) {
        this.Switchcart.totalAmount = response.data.calculateAmount;
        this.Switchcart.quantity = response.data.calculateUnit;
        this.Switchcart.remainingUnits = response.data.remainingUnit;
        this.GetSwitchCart();
      }
    })
  }

  GetSellableAmounts(i: any, instrumentId: any, serviceProviderAccountId: any) {
    // var postData = new FormData();
    // postData.append("instrumentId", instrumentId);
    // postData.append("serviceProviderAccountId", serviceProviderAccountId);

    const postData = {
      "instrumentId": instrumentId,
      "serviceProviderAccountId": serviceProviderAccountId
    }

    this.api.post("switchRedeemFunds/fetch-sellable-amount", postData, true).subscribe(response => {
      console.log('GetSellableAmounts', response);
      if (response.response.n == 1) {
        this.SwitchCartItemList[i].myHoldingCurrentValue = response.data.amount;
        this.SwitchCartItemList[i].myHoldingUnitsOwned = response.data.quantity;
        console.log('GetSellableAmounts', this.SwitchCartItemList[i].myHoldingCurrentValue);
      }
    })

  }

  GetSwitchCart() {
    this.Switchcart.instrumentId = this.SelectedMutualFund.id;
    // this.Switchcart.myHoldingCurrentValue = this.MyHoldingsProductOverviewDetails.holdingData.totalCurrentValue;
    // this.Switchcart.myHoldingUnitsOwned = this.MyHoldingsProductOverviewDetails.holdingData.quantity;
    this.Switchcart.sellType = this.SelectedMutualFund.RedeemSwitchFund.sellType;
    // this.Switchcart.totalAmount = this.SelectedMutualFund.RedeemSwitchFund.totalAmount;
    // this.Switchcart.quantity = this.SelectedMutualFund.RedeemSwitchFund.quantity;
    this.Switchcart.serviceProviderAccountId = this.SelectedMutualFund.serviceProviderId;

    this.SwitchCartItemList.push(this.Switchcart);
    console.log('GetSwitchCart', this.SwitchCartItemList)
    this.GetSchemeList(0);
    this.GetSellableAmounts(0, this.SwitchCartItemList[0].instrumentId, this.SwitchCartItemList[0].serviceProviderAccountId);
    this.SwitchLoader = false;
    this.EmptySwitchCart();
  }

  Checked(id: any, i: any) {
    if ($("#" + id).is(":checked")) {
      this.SwitchCartItemList[i].redeemFromGoal = 1;
    }
    else {
      this.SwitchCartItemList[i].redeemFromGoal = 0;
      this.SwitchCartItemList[i].goalId = '';
      this.SwitchCartItemList[i].secondaryGoalId = '';
    }
  }

  AddNewScheme() {
    this.EmptySwitchCart();
    this.SwitchCartItemList.push(this.Switchcart);
    for (let i = 0; i < this.SwitchCartItemList.length; i++) {
      this.SwitchCartItemList[i].isActive = 0;
    }
    var length = this.SwitchCartItemList.length - 1;
    this.SwitchCartItemList[length].isActive = 1;
    this.scrolltotop();
  }

  GetAmountAndUnit(i: any, sellType: any) {
    debugger
    if (sellType == 'Amount' && this.validate.isNullEmptyUndefined(this.SwitchCartItemList[i].totalAmount)) {
      this.toastr.error('Please enter amount');
    }
    else if (sellType == 'Unit' && this.validate.isNullEmptyUndefined(this.SwitchCartItemList[i].quantity)) {
      this.toastr.error('Please enter unit');
    }
    else if (sellType == 'Unit' && this.SwitchCartItemList[i].quantity > this.SwitchCartItemList[i].myHoldingUnitsOwned) {
      this.toastr.error('Unit value must be less than Units Owned');
    }
    else {
      var postData = new FormData();
      postData.append("instrumentId", this.SwitchCartItemList[i].instrumentId);
      postData.append("Type", sellType);
      postData.append("Amount", this.SwitchCartItemList[i].totalAmount);
      postData.append("Unit", this.SwitchCartItemList[i].quantity);

      this.api.post("switchRedeemFunds/calculate-amount-unit", postData).subscribe(response => {
        console.log(response);
        if (response.response.n == 1) {
          this.SwitchCartItemList[i].totalAmount = response.data.calculateAmount;
          this.SwitchCartItemList[i].quantity = response.data.calculateUnit;
          this.SwitchCartItemList[i].remainingUnits = response.data.remainingUnit;
        }
      })
    }
  }

  SwitchProceed() {
    let Flag = true;
    for (let i = 0; i < this.SwitchCartItemList.length; i++) {
      if (this.SwitchCartItemList[i].quantity == this.SwitchCartItemList[i].myHoldingUnitsOwned) {
        this.SwitchCartItemList[i].isAllUnits = true;
        this.SwitchCartItemList[i].fullSwitch = true;
      }
      else{
        this.SwitchCartItemList[i].isAllUnits = false;
        this.SwitchCartItemList[i].fullSwitch = false;
      }

      if (this.validate.isNullEmptyUndefined(this.SwitchCartItemList[i].instrumentId)) {
        this.toastr.error('Please select Instument Name of Scheme' + (i + 1));
        Flag = false;
        break;
      }
      else if (this.SwitchCartItemList[i].redeemFromGoal == 1 && this.validate.isNullEmptyUndefined(this.SwitchCartItemList[i].goalId)) {
        this.toastr.error('Please select Goal Name of Scheme' + (i + 1));
        Flag = false;
        break;
      }
      else if (this.SwitchCartItemList[i].redeemFromGoal == 1 && this.validate.isNullEmptyUndefined(this.SwitchCartItemList[i].secondaryGoalId)) {
        this.toastr.error('Please select Secondary Goal Name of Scheme' + (i + 1));
        Flag = false;
        break;
      }
      else if (this.validate.isNullEmptyUndefined(this.SwitchCartItemList[i].secondaryInstrumentId)) {
        this.toastr.error('Please select Secondary Instument Name of Scheme' + (i + 1));
        Flag = false;
        break;
      }
      else if (this.SwitchCartItemList[i].sellType == 'Amount' && (this.validate.isNullEmptyUndefined(this.SwitchCartItemList[i].totalAmount) || Number(this.SwitchCartItemList[i].totalAmount) == 0)) {
        this.toastr.error('Please enter Amount of Scheme' + (i + 1) + ' and it should not be zero');
        Flag = false;
        break;
      }
      else if (this.SwitchCartItemList[i].totalAmount > this.SwitchCartItemList[i].myHoldingCurrentValue) {
        this.toastr.error('Amount of Scheme' + (i + 1) + ' should not be greater than current value');
        Flag = false;
        break;
      }
      else if (this.SwitchCartItemList[i].sellType == 'Unit' && (this.validate.isNullEmptyUndefined(this.SwitchCartItemList[i].quantity) || Number(this.SwitchCartItemList[i].quantity) == 0)) {
        this.toastr.error('Please enter unit of Scheme' + (i + 1) + ' and it should not be zero');
        Flag = false;
        break;
      }
      else if (this.SwitchCartItemList[i].quantity > this.SwitchCartItemList[i].myHoldingUnitsOwned) {
        this.toastr.error('Unit value must be less than Units Owned of Scheme' + (i + 1));
        Flag = false;
        break;
      }
    }

    if (Flag) {


      console.log('SwitchProceed', this.SwitchCartItemList);
      // var postData = new FormData();
      // postData.append("cartType", 'Switch');
      // postData.append("cartItems", JSON.stringify(this.SwitchCartItemList));
      // this.api.post("switchRedeemFunds/switch", postData, true).subscribe(response => {
      //   console.log('SwitchProceed response', response)
      //   if (response.response.n == 1) {
      //     this.route.navigate(["/fund-switch-suceesful"]);
      //   }
      //   else {
      //     this.toastr.error(response.response.Msg);
      //   }
      // })
    }
  }


  // 'instrumentId': '',
  //   'goalId': '', //1st
  //   'SwitchFromGoal': 0,
  //   'myHoldingCurrentValue': '',
  //   'myHoldingUnitsOwned': '',
  //   'sellType': 'Amount',
  //   'totalAmount': '',
  //   'quantity': '',
  //   'secondaryInstrumentId': '', //2nd to sceme
  //   'secondaryGoalId': '', //2nd
  //   'serviceProviderAccountId': '',
  //   'isAllUnits': '',
  //   'fullSwitch': '',
  //   'remainingUnits': 0,
  //   'isActive': 1,
  //   'modeOfTransaction': 3,
  //   'transactionSubType': 1,
  //   'transactionTypeId': 11,
  //   'schemeList': []
























}
