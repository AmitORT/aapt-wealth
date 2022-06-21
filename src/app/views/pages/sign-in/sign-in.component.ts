import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';
import { AescryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { EligibilityService } from 'src/app/services/eligibility/eligibility.service';
import { ValidateService } from 'src/app/services/validate/validate.service';
declare var $: any;

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {


  firstname = "";
  lastname = "";
  phonecode = "91";
  mobilenumber = "";
  emailid = "";
  gendervalue = "";
  custdob = "";

  resendbuttonText = 'Resend OTP';
  interval: any;


  isOTPSent: any = false;
  isLoggedIn: any = false;
  FormEmail: any;
  FormPassword: any;
  FormFirstName: any;
  FormLastName: any;
  FormMobileNo: any;
  oldToken: any;
  newToken: any;

  otp1: string = "";
  otp2: string = "";
  otp3: string = "";
  otp4: string = "";
  otp5: string = "";
  otp6: string = "";
  pancard = "";
  aadhar_card_no = "";
  calltype: any;

  usertype: any = 'Customer';
  UrlRegister: any = 'auth/customer/register';
  UrlSendOTP: any = 'auth/customer/send-otp';
  urlValidateOTP: any = 'auth/customer/ValidateOTP';


  constructor(public validate: ValidateService, private toastr: ToastrService, private route: Router, private api: ApiService, private crypto: AescryptoService, private eligibility: EligibilityService) { }

  ngOnInit(): void {

    this.DOB();

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

  keytab(nextTabId: number, event: any) {
    let actionFlag = false;
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode < 96 || charCode > 105)) {
    }
    else if (charCode == 8) {
      nextTabId--;
      if (nextTabId < 1) {
        nextTabId = 1;
      }
      actionFlag = true;
    }
    else {
      if (nextTabId > 6) {
        nextTabId = 6;
      }
      actionFlag = true;
    }
    if (actionFlag) {
      const field = document.getElementById("otp" + nextTabId);
      if (field) {
        field.focus();
        field.click();
      }
    }
  }

  DOB() {
    var year = new Date().getFullYear();
    var month = new Date().getMonth();
    var day = new Date().getDate();
    var date = new Date(year - 18, month, day);
    var monthbefore = (date.getMonth() + 1).toString();
    var daybefore = (date.getDate()).toString();
    var yearbefore = date.getFullYear();
    if (parseInt(monthbefore) < 10) {
      monthbefore = '0' + monthbefore.toString();
    }
    if (parseInt(daybefore) < 10) {
      daybefore = '0' + daybefore.toString();
    }
    var maxDate = yearbefore + '-' + monthbefore + '-' + daybefore;
    $('#custdob').attr('max', maxDate);
  }

  EditNumber() {
    $('#otp-screen').modal('hide');
    $('#email_id').focus();
  }

  verifyOtp() {
    var otp = this.otp1.toString() + this.otp2.toString() + this.otp3.toString() + this.otp4.toString() + this.otp5.toString() + this.otp6.toString();
    console.log("OTP", otp);
    if (otp.length == 6) {
      let data = new FormData();
      data.append("email", this.emailid);
      data.append("otp", otp);
      this.api.post("auth/customer/ValidateOTP", data).subscribe((resp) => {
        console.log("verifyOtp", resp);
        if (resp.response.n == 1) {
          $("#otp-screen").modal("hide");
          if (!this.validate.isNullEmptyUndefined(resp.data.token.customer)) {
            var encryptedTokenCustomer = { "token": resp.data.token.customer };
            localStorage.setItem("CustToken", this.crypto.Encrypt(encryptedTokenCustomer));
            console.log("CustToken", encryptedTokenCustomer)
            this.route.navigate(["/mutual-fund-cart"])
          }
          if (!this.validate.isNullEmptyUndefined(resp.data.token.agent)) {
            var encryptedTokenAgent = { "token": resp.data.token.agent };
            localStorage.setItem("AgentToken", this.crypto.Encrypt(encryptedTokenAgent));
          }
          // this.GetApplicantData();        
          // this.getOffer();
        } else {
          this.toastr.error(resp.response.Msg);
        }
      });
    } else {
      this.toastr.error("kindly enter valid otp");
    }
  }

  sendotp() {
    if (this.validate.isNullEmptyUndefined(this.firstname.trim())) {
      this.toastr.error("First name is mandatory");
    }
    else if (this.validate.isNullEmptyUndefined(this.lastname.trim())) {
      this.toastr.error("Last name is mandatory");
    }
    else if (this.validate.isNullEmptyUndefined((this.mobilenumber.toString()).trim())) {
      this.toastr.error("Mobile number is mandatory");
    }
    else if (this.validate.isNullEmptyUndefined(this.emailid.trim())) {
      this.toastr.error("Email id is mandatory");
    }
    else if (!this.validate.validateEmail(this.emailid.trim())) {
      this.toastr.error("Please enter valid Email id");
    }
    else if (this.validate.isNullEmptyUndefined(this.gendervalue.trim())) {
      this.toastr.error("Gender is mandatory");
    }
    else if (this.validate.isNullEmptyUndefined(this.custdob.trim())) {
      this.toastr.error("Date of birth is mandatory");
    }
    else if (this.validate.isNullEmptyUndefined(this.pancard)) {
      this.toastr.error("Pancard is mandatory");
    }
    else if (!this.validate.validatePancard(this.pancard)) {
      this.toastr.error("Please enter valid Pancard Number");
    }
    else if (this.validate.isNullEmptyUndefined(this.aadhar_card_no)) {
      this.toastr.error("Aadhar card number is mandatory");
    }
    else if (!this.validate.validateAadharNumber(this.aadhar_card_no)) {
      this.toastr.error("Please enter valid Aadhar card number");
    }
    else {
      let data = new FormData();
      data.append("firstName", this.firstname);
      data.append("lastName", this.lastname);
      data.append("email", this.emailid);
      data.append("mobileNumber", this.mobilenumber);
      data.append("dob", this.custdob);
      data.append("gender", this.gendervalue);
      data.append("panCard", this.pancard);
      data.append("aadharCard", this.aadhar_card_no);

      this.api.post("auth/customer/check-and-add", data).subscribe((resp) => {
        console.log("check-and-add", resp);
        if (resp.response.n == 1 && !this.validate.isNullEmptyUndefined(resp.data.otp)) {
          console.log("check-and-add OTP", resp.data.otp);
          this.ResetOTP();
          $("#otp-screen").modal("show");
          this.resendbuttonText = "2:30"
          this.countdown();
        } else if (resp.response.n == 1 && !this.validate.isNullEmptyUndefined(resp.data.token)) {
          var custToken = { "token": resp.data.token };
          localStorage.setItem("CustToken", this.crypto.Encrypt(custToken));
        } else {
          this.toastr.error(resp.response.Msg);
        }
      });
    }
  }

  ResendOTP() {
    this.ResetOTP();
    const data = new FormData();
    data.append("email", this.emailid);
    this.api.post('auth/customer/send-otp', data, false).subscribe(response => {
      if (response.response.n == 1) {
        console.log(response.data.otp);
        // this.toastr.success(response.data.otp);
        this.resendbuttonText = "2:30"
        this.countdown();
      }
    })
  }

  ResetOTP() {
    this.otp1 = "";
    this.otp2 = "";
    this.otp3 = "";
    this.otp4 = "";
    this.otp5 = "";
    this.otp6 = "";
  }

  countdown() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      var timer: any = this.resendbuttonText;
      timer = timer.split(':');
      var minutes = timer[0];
      var seconds = timer[1];
      seconds -= 1;
      if (minutes < 0) return;
      else if (seconds < 0 && minutes != 0) {
        minutes -= 1;
        seconds = 59;
      }
      else if (seconds < 10 && seconds.length != 2) {
        seconds = '0' + seconds
      };

      this.resendbuttonText = minutes + ':' + seconds;

      if (minutes == 0 && seconds == 0) {
        clearInterval(this.interval)
        this.resendbuttonText = 'Resend OTP';
      };
    }, 1000);

  }
}
