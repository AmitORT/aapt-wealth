import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';
import { AescryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ValidateService } from 'src/app/services/validate/validate.service';
declare var $: any;

@Component({
  selector: 'app-stp',
  templateUrl: './stp.component.html',
  styleUrls: ['./stp.component.css']
})
export class StpComponent implements OnInit {

  STPLoader: boolean = true;
  SelectedMutualFund: any;
  MyHoldings: any;
  MyHoldingsProductOverviewDetails: any;
  MyGoals: any;
  maxStartdate: any;

  STPcart: any = {
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
    'secondaryInstrumentId': '', //2nd to sceme
    'secondaryGoalId': '',
    'InstallmentStatement': '',
    'serviceProviderAccountId': '',
    'isActive': 1,
    "modeOfTransaction": 3,
    'transactionSubType': 2,
    'transactionTypeId': 11,
    'schemeList': []
  }

  STPCartItemList: any = [
    // {
    //   'isActive': 1,
    // },
    // {
    //   'isActive': 0,
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

  EmptySTPCart() {
    this.STPcart = {
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
      'secondaryInstrumentId': '', //2nd to sceme
      'secondaryGoalId': '',
      'InstallmentStatement': '',
      'serviceProviderAccountId': '',
      'isActive': 0,
      "modeOfTransaction": 3,
      'transactionSubType': 2,
      'transactionTypeId': 11,
      'schemeList': []
    }
  }

  GetStartDate() {
    var dtToday = new Date();
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
    var dtToday = new Date(this.STPCartItemList[i].startDateForSip);
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

    this.STPCartItemList[i].endDate = year + '-' + month + '-' + day;
  }

  GetInstallmentStatement(i: any) {
    const date = new Date(this.STPCartItemList[i].startDateForSip);
    const monthyear = new Date(this.STPCartItemList[i].endDateForSip);
    this.STPCartItemList[i].InstallmentStatement = date.getDate() + '' + this.validate.getCurrentDateWithSpecificFormat(date.getDate()) + ' of every month until ' + this.validate.GetMonthText(monthyear.getMonth()) + ' ' + monthyear.getFullYear();
  }

  GetSchemeList(i: any) {
    var postData = new FormData();
    postData.append("serviceProviderId", this.STPCartItemList[i].serviceProviderAccountId);
    postData.append("switchType", 'STP');
    this.api.post("switchRedeemFunds/fetch-instruments", postData, true).subscribe(response => {
      console.log('GetSchemeList', response.data)
      if (response.response.n == 1) {
        this.STPCartItemList[i].schemeList = response.data;
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

        if (this.STPLoader) {
          this.MyHoldingsProductOverviewDetails = response.data;
          this.GetAmountUnitDetail();
        }
        else {
          this.STPCartItemList[i].serviceProviderAccountId = response.data.productOverview.serviceProviderId;
          this.GetSchemeList(i);
          this.GetSellableAmounts(i, instrumentId, this.STPCartItemList[i].serviceProviderAccountId)
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
        this.STPcart.totalAmount = response.data.calculateAmount;
        this.STPcart.quantity = response.data.calculateUnit;
        this.STPcart.remainingUnits = response.data.remainingUnit;
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
        this.STPCartItemList[i].myHoldingCurrentValue = response.data.amount;
        this.STPCartItemList[i].myHoldingUnitsOwned = response.data.quantity;
        console.log('Get SellableAmounts', this.STPCartItemList[i].myHoldingCurrentValue);
      }
    })

  }

  GetSwitchCart() {
    this.STPcart.instrumentId = this.SelectedMutualFund.id;
    this.STPcart.sellType = this.SelectedMutualFund.RedeemSwitchFund.sellType;
    this.STPcart.serviceProviderAccountId = this.SelectedMutualFund.serviceProviderId;

    this.STPCartItemList.push(this.STPcart);
    console.log('GetSTPCart', this.STPCartItemList);
    this.GetSchemeList(0);
    this.GetSellableAmounts(0, this.STPCartItemList[0].instrumentId, this.STPCartItemList[0].serviceProviderAccountId);
    this.STPLoader = false;
    this.EmptySTPCart();
  }

  Checked(id: any, i: any) {
    if ($("#" + id).is(":checked")) {
      this.STPCartItemList[i].redeemFromGoal = 1;
    }
    else {
      this.STPCartItemList[i].redeemFromGoal = 0;
      this.STPCartItemList[i].goalId = '';
    }
  }

  AddNewScheme() {
    this.EmptySTPCart();
    this.STPCartItemList.push(this.STPcart);
    for (let i = 0; i < this.STPCartItemList.length; i++) {
      this.STPCartItemList[i].isActive = 0;
    }
    var length = this.STPCartItemList.length - 1;
    this.STPCartItemList[length].isActive = 1;
    this.scrolltotop();
    // this.GetStartDate();
  }

  GetAmountAndUnit(i: any, sellType: any) {
    debugger
    if (sellType == 'Amount' && this.validate.isNullEmptyUndefined(this.STPCartItemList[i].totalAmount)) {
      this.toastr.error('Please enter amount');
    }
    else if (sellType == 'Unit' && this.validate.isNullEmptyUndefined(this.STPCartItemList[i].quantity)) {
      this.toastr.error('Please enter unit');
    }
    else if (sellType == 'Unit' && this.STPCartItemList[i].quantity > this.STPCartItemList[i].myHoldingUnitsOwned) {
      this.toastr.error('Unit value must be less than Units Owned');
    }
    else {
      var postData = new FormData();
      postData.append("instrumentId", this.STPCartItemList[i].instrumentId);
      postData.append("Type", sellType);
      postData.append("Amount", this.STPCartItemList[i].totalAmount);
      postData.append("Unit", this.STPCartItemList[i].quantity);

      this.api.post("switchRedeemFunds/calculate-amount-unit", postData).subscribe(response => {
        console.log(response);
        if (response.response.n == 1) {
          this.STPCartItemList[i].totalAmount = response.data.calculateAmount;
          this.STPCartItemList[i].quantity = response.data.calculateUnit;
          this.STPCartItemList[i].remainingUnits = response.data.remainingUnit;
        }
      })
    }
  }

  DeleteSTPFromList(i: any) {
    this.STPCartItemList.splice(i, 1);
  }

  STPProceed() {
    let Flag = true;
    for (let i = 0; i < this.STPCartItemList.length; i++) {
      if (this.STPCartItemList[i].quantity == this.STPCartItemList[i].myHoldingUnitsOwned) {
        this.STPCartItemList[i].isAllUnits = true;
        this.STPCartItemList[i].fullSwitch = true;
      }
      else {
        this.STPCartItemList[i].isAllUnits = false;
        this.STPCartItemList[i].fullSwitch = false;
      }

      if (this.validate.isNullEmptyUndefined(this.STPCartItemList[i].instrumentId)) {
        this.toastr.error('Please select Instument Name of Scheme' + (i + 1));
        Flag = false;
        break;
      }
      else if (this.STPCartItemList[i].redeemFromGoal == 1 && this.validate.isNullEmptyUndefined(this.STPCartItemList[i].goalId)) {
        this.toastr.error('Please select Goal Name of Scheme' + (i + 1));
        Flag = false;
        break;
      }
      else if (this.STPCartItemList[i].redeemFromGoal == 1 && this.validate.isNullEmptyUndefined(this.STPCartItemList[i].secondaryGoalId)) {
        this.toastr.error('Please select Secondary Goal Name of Scheme' + (i + 1));
        Flag = false;
        break;
      }
      else if (this.validate.isNullEmptyUndefined(this.STPCartItemList[i].secondaryInstrumentId)) {
        this.toastr.error('Please select Secondary Instument Name of Scheme' + (i + 1));
        Flag = false;
        break;
      }
      else if (this.STPCartItemList[i].sellType == 'Amount' && (this.validate.isNullEmptyUndefined(this.STPCartItemList[i].totalAmount) || Number(this.STPCartItemList[i].totalAmount) == 0)) {
        this.toastr.error('Please enter Amount of Scheme' + (i + 1) + ' and it should not be zero');
        Flag = false;
        break;
      }
      else if (this.STPCartItemList[i].totalAmount > this.STPCartItemList[i].myHoldingCurrentValue) {
        this.toastr.error('Amount of Scheme' + (i + 1) + ' should not be greater than current value');
        Flag = false;
        break;
      }
      else if (this.STPCartItemList[i].sellType == 'Unit' && (this.validate.isNullEmptyUndefined(this.STPCartItemList[i].quantity) || Number(this.STPCartItemList[i].quantity) == 0)) {
        this.toastr.error('Please enter unit of Scheme' + (i + 1) + ' and it should not be zero');
        Flag = false;
        break;
      }
      else if (this.STPCartItemList[i].quantity > this.STPCartItemList[i].myHoldingUnitsOwned) {
        this.toastr.error('Unit value must be less than Units Owned of Scheme' + (i + 1));
        Flag = false;
        break;
      }
      else if (this.validate.isNullEmptyUndefined(this.STPCartItemList[i].startDateForSip)) {
        this.toastr.error('Please select start date for SIP of Scheme' + (i + 1));
        Flag = false;
        break;
      }
      else if (this.validate.checkLessThanCurrentDate(this.STPCartItemList[i].startDateForSip)) {
        this.toastr.error('Please select valid start date for SIP of Scheme' + (i + 1));
        Flag = false;
        break;
      }
      else if (this.validate.isNullEmptyUndefined(this.STPCartItemList[i].endDateForSip)) {
        this.toastr.error('Please select End date for SIP of Scheme' + (i + 1));
        Flag = false;
        break;
      }
      else if (this.validate.checkTwoDateComparison(this.STPCartItemList[i].startDateForSip, this.STPCartItemList[i].endDateForSip, 30)) {
        this.toastr.error('Please select valid End date for SIP of Scheme' + (i + 1));
        Flag = false;
        break;
      }
    }
    if (Flag) {
      for (let i = 0; i < this.STPCartItemList.length; i++) {
        this.STPCartItemList[i].schemeList = [];
      }

      console.log('STPProceed', this.STPCartItemList);
      var postData = new FormData();
      postData.append("cartType", 'Stp');
      postData.append("cartItems", JSON.stringify(this.STPCartItemList));
      this.api.post("switchRedeemFunds/systematic-transfer-plan", postData, true).subscribe(response => {
        console.log('STPProceed response', response)
        if (response.response.n == 1) {
          this.route.navigate(["/stp-setup-suceesful"]);
        }
        else {
          this.toastr.error(response.response.Msg);
        }
      })
    }


  }



}
