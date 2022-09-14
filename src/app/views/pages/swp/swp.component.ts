import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';
import { AescryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ValidateService } from 'src/app/services/validate/validate.service';
declare var $: any;

@Component({
  selector: 'app-swp',
  templateUrl: './swp.component.html',
  styleUrls: ['./swp.component.css']
})
export class SwpComponent implements OnInit {
  
  SWPLoader: boolean = true;
  SelectedMutualFund: any;
  MyHoldings: any;
  MyHoldingsProductOverviewDetails: any;
  MyGoals: any;
  maxStartdate: any;
  SWPcart: any = {
    'instrumentId': '',
    'goalId': '',
    'SwitchFromGoal': 0,
    'frequency': 4,
    'myHoldingCurrentValue': '',
    'myHoldingUnitsOwned': '',
    'sellType': 'Amount',
    'totalAmount': '',
    'quantity': '',
    'isAllUnits': '',
    'fullSwitch': '',
    'remainingUnits': 0,
    'startDateForSip': '',
    'endDateForSip': '',
    'endDate': '',
    'InstallmentStatement': '',
    'serviceProviderAccountId': '',
    'isActive': 1,
    "modeOfTransaction": 2,
    'transactionSubType': 2,
    'transactionTypeId': 3,
  }

  SWPCartItemList: any = [
    // {
    //   'isActive': 1,
    // },
    // {
    //   'isActive': 1,
    // }
  ];

  constructor(public route: Router, private toastr: ToastrService, public validate: ValidateService, private crypto: AescryptoService, private api: ApiService) { }

  ngOnInit(): void {
    this.GetMyHoldings();
    this.GetMyGoals();
    this.GetStartDate();

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


  EmptySWPCart() {
    this.SWPcart = {
      'instrumentId': '',
      'goalId': '',
      'SwitchFromGoal': 0,
      'frequency': 4,
      'myHoldingCurrentValue': '',
      'myHoldingUnitsOwned': '',
      'sellType': 'Amount',
      'totalAmount': '',
      'quantity': '',
      'isAllUnits': '',
      'fullSwitch': '',
      'remainingUnits': 0,
      'startDateForSip': '',
      'endDateForSip': '',
      'endDate': '',
      'InstallmentStatement': '',
      'serviceProviderAccountId': '',
      'isActive': 0,
      "modeOfTransaction": 2,
      'transactionSubType': 2,
      'transactionTypeId': 3,
    }
  }



  GetStartDate() {
    var dtToday = new Date();
    dtToday.setDate(dtToday.getDate() + 1);
    var month = (dtToday.getMonth() + 1).toString();
    var day = (dtToday.getDate()).toString();
    var year = dtToday.getFullYear();
    if (parseInt(month) < 10) {
      month = '0' + month.toString();
    }
    if (parseInt(day) < 10) {
      day = '0' + day.toString();
    }
    this.maxStartdate = year + '-' + month + '-' + day;
    // var maxDate = year + '-' + month + '-' + day;
    // $('#startDateForSip').attr('min', maxDate);
  }

  GetEndDate(i: any) {
    var dtToday = new Date(this.SWPCartItemList[i].startDateForSip);
    dtToday.setDate(dtToday.getDate() + 30);
    var month = (dtToday.getMonth() + 1).toString();
    var day = (dtToday.getDate()).toString();
    var year = dtToday.getFullYear();
    if (parseInt(month) < 10) {
      month = '0' + month.toString();
    }
    if (parseInt(day) < 10) {
      day = '0' + day.toString();
    }
    // var maxDate = year + '-' + month + '-' + day;
    // $('#targetDate').attr('min', maxDate);

    this.SWPCartItemList[i].endDate = year + '-' + month + '-' + day;
  }

  GetInstallmentStatement(i: any) {
    const date = new Date(this.SWPCartItemList[i].startDateForSip);
    const monthyear = new Date(this.SWPCartItemList[i].endDateForSip);
    this.SWPCartItemList[i].InstallmentStatement = date.getDate() + '' + this.validate.getCurrentDateWithSpecificFormat(date.getDate()) + ' of every month until ' + this.validate.GetMonthText(monthyear.getMonth()) + ' ' + monthyear.getFullYear();
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

        if (this.SWPLoader) {
          this.MyHoldingsProductOverviewDetails = response.data;
          this.GetAmountUnitDetail();
        }
        else {
          this.SWPCartItemList[i].serviceProviderAccountId = response.data.productOverview.serviceProviderId;
          this.GetSellableAmounts(i, instrumentId, this.SWPCartItemList[i].serviceProviderAccountId)
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
        this.SWPcart.totalAmount = response.data.calculateAmount;
        this.SWPcart.quantity = response.data.calculateUnit;
        this.SWPcart.remainingUnits = response.data.remainingUnit;
        this.GetSwitchCart();
      }
    })
  }

  GetSellableAmounts(i: any, instrumentId: any, serviceProviderAccountId: any) {

    const postData = {
      "instrumentId": instrumentId,
      "serviceProviderAccountId": serviceProviderAccountId
    }

    this.api.post("switchRedeemFunds/fetch-sellable-amount", postData, true).subscribe(response => {
      console.log('Get SellableAmounts', response);
      if (response.response.n == 1) {
        this.SWPCartItemList[i].myHoldingCurrentValue = response.data.amount;
        this.SWPCartItemList[i].myHoldingUnitsOwned = response.data.quantity;
        console.log('Get SellableAmounts', this.SWPCartItemList[i].myHoldingCurrentValue);
      }
    })

  }

  GetSwitchCart() {
    this.SWPcart.instrumentId = this.SelectedMutualFund.id;
    this.SWPcart.sellType = this.SelectedMutualFund.RedeemSwitchFund.sellType;
    this.SWPcart.serviceProviderAccountId = this.SelectedMutualFund.serviceProviderId;

    this.SWPCartItemList.push(this.SWPcart);
    console.log('GetSWPCart', this.SWPCartItemList);
    this.GetSellableAmounts(0, this.SWPCartItemList[0].instrumentId, this.SWPCartItemList[0].serviceProviderAccountId);
    this.SWPLoader = false;
    this.EmptySWPCart();
  }

  Checked(id: any, i: any) {
    if ($("#" + id).is(":checked")) {
      this.SWPCartItemList[i].redeemFromGoal = 1;
    }
    else {
      this.SWPCartItemList[i].redeemFromGoal = 0;
      this.SWPCartItemList[i].goalId = '';
    }
  }

  AddNewScheme() {
    this.EmptySWPCart();
    this.SWPCartItemList.push(this.SWPcart);
    for (let i = 0; i < this.SWPCartItemList.length; i++) {
      this.SWPCartItemList[i].isActive = 0;
    }
    var length = this.SWPCartItemList.length - 1;
    this.SWPCartItemList[length].isActive = 1;
    this.scrolltotop();
    // this.GetStartDate();
  }

  GetAmountAndUnit(i: any, sellType: any) {
    // debugger
    if (sellType == 'Amount' && this.validate.isNullEmptyUndefined(this.SWPCartItemList[i].totalAmount)) {
      this.toastr.error('Please enter amount');
    }
    else if (sellType == 'Unit' && this.validate.isNullEmptyUndefined(this.SWPCartItemList[i].quantity)) {
      this.toastr.error('Please enter unit');
    }
    else if (sellType == 'Unit' && this.SWPCartItemList[i].quantity > this.SWPCartItemList[i].myHoldingUnitsOwned) {
      this.toastr.error('Unit value must be less than Units Owned');
    }
    else {
      var postData = new FormData();
      postData.append("instrumentId", this.SWPCartItemList[i].instrumentId);
      postData.append("Type", sellType);
      postData.append("Amount", this.SWPCartItemList[i].totalAmount);
      postData.append("Unit", this.SWPCartItemList[i].quantity);

      this.api.post("switchRedeemFunds/calculate-amount-unit", postData).subscribe(response => {
        console.log(response);
        if (response.response.n == 1) {
          this.SWPCartItemList[i].totalAmount = response.data.calculateAmount;
          this.SWPCartItemList[i].quantity = response.data.calculateUnit;
          this.SWPCartItemList[i].remainingUnits = response.data.remainingUnit;
        }
      })
    }
  }

  DeleteSWPFromList(i: any) {
    this.SWPCartItemList.splice(i, 1);
  }

  SWPProceed() {
    let Flag = true;
    for (let i = 0; i < this.SWPCartItemList.length; i++) {
      if (this.SWPCartItemList[i].quantity == this.SWPCartItemList[i].myHoldingUnitsOwned) {
        this.SWPCartItemList[i].isAllUnits = true;
        this.SWPCartItemList[i].fullSwitch = true;
      }
      else {
        this.SWPCartItemList[i].isAllUnits = false;
        this.SWPCartItemList[i].fullSwitch = false;
      }

      if (this.validate.isNullEmptyUndefined(this.SWPCartItemList[i].instrumentId)) {
        this.toastr.error('Please select Instument Name of Scheme' + (i + 1));
        Flag = false;
        break;
      }
      else if (this.SWPCartItemList[i].redeemFromGoal == 1 && this.validate.isNullEmptyUndefined(this.SWPCartItemList[i].goalId)) {
        this.toastr.error('Please select Goal Name of Scheme' + (i + 1));
        Flag = false;
        break;
      }
      else if (this.SWPCartItemList[i].sellType == 'Amount' && (this.validate.isNullEmptyUndefined(this.SWPCartItemList[i].totalAmount) || Number(this.SWPCartItemList[i].totalAmount) == 0)) {
        this.toastr.error('Please enter Amount of Scheme' + (i + 1) + ' and it should not be zero');
        Flag = false;
        break;
      }
      else if (this.SWPCartItemList[i].totalAmount > this.SWPCartItemList[i].myHoldingCurrentValue) {
        this.toastr.error('Amount of Scheme' + (i + 1) + ' should not be greater than current value');
        Flag = false;
        break;
      }
      else if (this.SWPCartItemList[i].sellType == 'Unit' && (this.validate.isNullEmptyUndefined(this.SWPCartItemList[i].quantity) || Number(this.SWPCartItemList[i].quantity) == 0)) {
        this.toastr.error('Please enter unit of Scheme' + (i + 1) + ' and it should not be zero');
        Flag = false;
        break;
      }
      else if (this.SWPCartItemList[i].quantity > this.SWPCartItemList[i].myHoldingUnitsOwned) {
        this.toastr.error('Unit value must be less than Units Owned of Scheme' + (i + 1));
        Flag = false;
        break;
      }
      else if (this.validate.isNullEmptyUndefined(this.SWPCartItemList[i].startDateForSip)) {
        this.toastr.error('Please select start date for SIP of Scheme' + (i + 1));
        Flag = false;
        break;
      }
      else if (this.validate.checkLessThanCurrentDate(this.SWPCartItemList[i].startDateForSip)) {
        this.toastr.error('Please select valid start date for SIP of Scheme' + (i + 1));
        Flag = false;
        break;
      }
      else if (this.validate.isNullEmptyUndefined(this.SWPCartItemList[i].endDateForSip)) {
        this.toastr.error('Please select End date for SIP of Scheme' + (i + 1));
        Flag = false;
        break;
      }
      else if (this.validate.checkTwoDateComparison(this.SWPCartItemList[i].startDateForSip, this.SWPCartItemList[i].endDateForSip, 30)) {
        this.toastr.error('Please select valid End date for SIP of Scheme' + (i + 1));
        Flag = false;
        break;
      }
    }
    if (Flag) {
      console.log('SWPProceed', this.SWPCartItemList);
      var postData = new FormData();
      postData.append("cartType", 'Swp');
      postData.append("cartItems", JSON.stringify(this.SWPCartItemList));
      this.api.post("switchRedeemFunds/systematic-withdraw-funds", postData, true).subscribe(response => {
        console.log('SWPProceed response', response)
        if (response.response.n == 1) {
          this.route.navigate(["/swp-setup-suceesful"]);
        }
        else {
          this.toastr.error(response.response.Msg);
        }
      })
    }


  }



  // [routerLink]="['/swp-setup-suceesful']"



}
