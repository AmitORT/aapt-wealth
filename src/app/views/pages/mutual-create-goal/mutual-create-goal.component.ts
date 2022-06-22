import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { AescryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ValidateService } from 'src/app/services/validate/validate.service';
import { ToastrService } from 'ngx-toastr';
import { EligibilityService } from 'src/app/services/eligibility/eligibility.service';
import { DatePipe } from '@angular/common';

declare var $: any;


@Component({
  selector: 'app-mutual-create-goal',
  templateUrl: './mutual-create-goal.component.html',
  styleUrls: ['./mutual-create-goal.component.css']
})
export class MutualCreateGoalComponent implements OnInit {

  RupeeChange: boolean = false;
  dateFormat: any;

  CreateGoal: any = {
    "ImageOfGoal": "",
    "Savings": "",
    "Payment_Mode": "",
    "Goal_Amount": "",
    "Goal_Duartion": "",
    "Date_For_Installments": "15",
    "Return_Rate": "0",
    "Inflation_Rate": "0",
    "Saving_Amount": "",
    "startDate": "",
    "targetDate": "",
    "AmountRS":"",
  }

  Goals: any;
  CreateGoalList: any = []

  DateOfInstallment: any;
  ProceedCart: any;
  ApplicantData: any;

  constructor(private datepipe: DatePipe, public route: Router, private toastr: ToastrService, public eligibilityService: EligibilityService, public validate: ValidateService, private crypto: AescryptoService, private api: ApiService) { }

  ngOnInit(): void {
    this.GetStartDate();

    if (localStorage.getItem("ApplicantData") != '') {
      this.ApplicantData = this.crypto.Decrypt(localStorage.getItem("ApplicantData"));
      console.log('app data', this.ApplicantData)
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
    var maxDate = year + '-' + month + '-' + day;
    $('#startDate').attr('min', maxDate);
  }

  GetTargetDate() {
    var dtToday = new Date(this.CreateGoal.startDate);
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
    var maxDate = year + '-' + month + '-' + day;
    $('#targetDate').attr('min', maxDate);
  }

  uploadFile($event: any) {
    var Image: any;
    var reader = new FileReader();
    reader.readAsDataURL($event.target.files[0]);
    Image = $event.target.files[0];
    reader.onload = function () {
      var ThumbnailBase64 = reader.result;
      console.log("thumbnail ", ThumbnailBase64);
      $("#profileimg").attr("src", ThumbnailBase64);
      // Image=ThumbnailBase64;
    }
    console.log($event.target.files[0]); // outputs the first file
    console.log("Image", Image)
  }

  options12: Options = {
    floor: 0,
    ceil: 20,
    hidePointerLabels: true,
    translate: (value12: number, label: any): string => {
      switch (label) {
        case label.Low:
          return "<b>0% Min</b> ₹" + value12;
        case label.High:
          return "<b>20% Max</b> ₹" + value12;
        default:
          return value12 + "%";
      }
    }
  };

  options13: Options = {
    floor: 0,
    ceil: 20,
    hidePointerLabels: true,
    translate: (value12: number, label: any): string => {
      switch (label) {
        case label.Low:
          return "<b>0% Min</b> ₹" + value12;
        case label.High:
          return "<b>20% Max</b> ₹" + value12;
        default:
          return value12 + "%";
      }
    }
  };


  CalculateSavingAmount() {
    debugger
    if (this.validate.isNullEmptyUndefined(this.CreateGoal.Savings)) {
      this.toastr.error('Reason for saving is mandatory');
    }
    else if (this.validate.isNullEmptyUndefined(this.CreateGoal.Payment_Mode)) {
      this.toastr.error('Payment Mode is mandatory');
    }
    else if (this.validate.isNullEmptyUndefined(this.CreateGoal.Goal_Amount)) {
      this.toastr.error('Goal Amount is mandatory');
    }
    else if (this.validate.isNullEmptyUndefined(this.CreateGoal.startDate)) {
      this.toastr.error('Please select start Date');
    }
    else if (this.validate.isNullEmptyUndefined(this.CreateGoal.targetDate)) {
      this.toastr.error('Please select End Date');
    }
    else if (this.CreateGoal.Return_Rate == 0) {
      this.toastr.error('Rate of Return is mandatory');
    }
    else if (this.CreateGoal.Inflation_Rate == 0) {
      this.toastr.error('Rate of Inflation is mandatory');
    }
    else {
      var postData = new FormData();
      postData.append("type", '1');
      postData.append("investmentMode", this.CreateGoal.Payment_Mode);
      postData.append("targetAmount", this.CreateGoal.Goal_Amount);
      postData.append("targetDate", this.CreateGoal.targetDate);
      postData.append("expectedCorpus", '');
      postData.append("rateInflation", this.CreateGoal.Inflation_Rate);
      postData.append("rateReturn", this.CreateGoal.Return_Rate);
      postData.append("fullName", this.ApplicantData.firstName);
      postData.append("email", this.ApplicantData.email);
      postData.append("mobileNumber", this.ApplicantData.mobileNumber);
      postData.append("name", this.CreateGoal.Savings);
      this.api.post('sipCalculator/goal-tools',postData,true).subscribe(response=>{
        console.log('tool',response);
        if(response.response.n==1){
          this.CreateGoal.AmountRS=response.data.monthly;
          console.log(this.CreateGoal.AmountRS);
        }
      })


    }
  }


  CreateGoalAndInvest() {
    if (this.validate.isNullEmptyUndefined(this.CreateGoal.Savings)) {
      this.toastr.error('Reason for saving is mandatory');
    }
    else if (this.validate.isNullEmptyUndefined(this.CreateGoal.Payment_Mode)) {
      this.toastr.error('Payment Mode is mandatory');
    }
    else if (this.validate.isNullEmptyUndefined(this.CreateGoal.Goal_Amount)) {
      this.toastr.error('Goal Amount is mandatory');
    }
    else if (this.validate.isNullEmptyUndefined(this.CreateGoal.startDate)) {
      this.toastr.error('Please select start Date');
    }
    else if (this.validate.isNullEmptyUndefined(this.CreateGoal.targetDate)) {
      this.toastr.error('Please select End Date');
    }
    else if (this.CreateGoal.Return_Rate == 0) {
      this.toastr.error('Rate of Return is mandatory');
    }
    else if (this.CreateGoal.Inflation_Rate == 0) {
      this.toastr.error('Rate of Inflation is mandatory');
    }
    else {
      var postData = new FormData();
      postData.append("type", '1');
      postData.append("investmentMode", this.CreateGoal.Payment_Mode);
      postData.append("targetAmount", this.CreateGoal.Goal_Amount);
      postData.append("startDate", this.CreateGoal.startDate);
      postData.append("targetDate", this.CreateGoal.targetDate);
      postData.append("rateInflation", this.CreateGoal.Inflation_Rate);
      postData.append("rateReturn", this.CreateGoal.Return_Rate);
      postData.append("name", this.CreateGoal.Savings);
      this.api.post("goalDetails/create-goal", postData, true).subscribe(response => {
        console.log('create goal', response)
        if (response.response.n == 1) {
          localStorage.setItem("CreatedGoal", this.crypto.Encrypt(this.CreateGoal));
          this.CreateInvestor(response.goalId);
        }
        else {
          this.toastr.error(response.response.Msg);
        }
      })
    }
  }

  CreateInvestor(goalid: any) {
    var data = { 'panCardNumber': 'IFSPS1505L', 'name': 'Gaurdian1911', 'gender': 1, 'birthDate': '1965-01-01', 'relation': 1 };
    var postData = new FormData();
    postData.append("birth_date", "2000-01-01T06:30:00.000Z");
    postData.append("investor_type", "1");
    postData.append("pan", this.ApplicantData.panCard);
    postData.append("date_of_incorporation", "2020-01-01T06:30:00.000Z");
    postData.append("guardian_details", JSON.stringify(data));
    this.api.post("wealthfy/add-update-investor-details", postData, true).subscribe(response => {
      console.log('inverstor create', response)
      if (response.response.n == 1) {
        this.ProceedToCart(goalid);
      }
    })
  }

  // GetOnlyDay(){    
  //   this.CreateGoal.Date_For_Installments=this.CreateGoal.Date_For_Installments.slice(8);
  // }

  ProceedToCart(goalid: any) {
    debugger;
    var postData = new FormData();
    postData.append("goalId", goalid);
    postData.append("transactionTypeId", '1');
    postData.append("endDateForSip", '2023-02-01T11:01:56.652Z');
    postData.append("instrumentId", '255527');
    postData.append("totalAmount", '1234');
    postData.append("modeOfTransaction", '1');
    postData.append("frequency", '4');
    postData.append("transactionSubType", '2');
    postData.append("frequencyDay", '1');
    postData.append("startDateForSip", '2021-09-01T11:01:56.652Z');
    postData.append("serviceProviderAccountId", '20753');

    this.api.post("wealthfy/proceed-to-cart", postData).subscribe(resp => {
      this.ProceedCart = resp.data;
      let encrypted = this.crypto.Encrypt(this.ProceedCart);
      localStorage.setItem("ProceedCart", encrypted);
      console.log("ProceedToCart", resp.data)

      this.route.navigate(["/mutual-fund-cart"])

    })

  }

}
