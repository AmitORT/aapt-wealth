import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { registerRequest } from 'src/app/models/registerRequest.model';
import { ApiService } from 'src/app/services/api/api.service';
import { AescryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { EligibilityService } from 'src/app/services/eligibility/eligibility.service';
import { RedirectionsService } from 'src/app/services/redirections/redirections.service';
import { ValidateService } from 'src/app/services/validate/validate.service';
import { environment } from 'src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  isOTPSent: any = false;
  isLoggedIn: any = false;
  FormEmail: any="";
  FormFirstName: any="";
  FormLastName: any="";
  FormMobileNo: any="";
  FormCheckbox: any;
  otp1: any;
  MobileSiginBarFlag: any = true;
  oldToken: any;
  newToken: any;
  footerotp1: string = "";
  footerotp2: string = "";
  footerotp3: string = "";
  footerotp4: string = "";
  footerotp5: string = "";
  footerotp6: string = "";
  interval: any;
  resendbuttonText = 'Resend OTP';
  footerYear: number = new Date().getFullYear();
  Token: any;
  AToken: any;
  calltype: any;
  usertype: any = 'Customer';
  UrlRegister: any = 'auth/customer/register';
  UrlSendOTP: any = 'auth/customer/send-otp';
  urlValidateOTP: any = 'auth/customer/ValidateOTP';

  constructor(public api: ApiService, public validation: ValidateService, public redirect: RedirectionsService, public toastr: ToastrService, public route: Router, private cryptoManager: AescryptoService, public eligibility: EligibilityService) { }

  ngOnInit(): void {
    this.isOTPSent = false;
    this.FormCheckbox = 0;

    var authToken = localStorage.getItem('CustToken') || '';
    if (this.validation.isNullEmptyUndefined(authToken)) {
      this.isLoggedIn = false;
      this.MobileSiginBarFlag = true;
    }
    else {
      this.isLoggedIn = true;
      this.MobileSiginBarFlag = false;
    }

    $(".applybtn-mob").hide();
    $(".body-color").scroll(function () {
      if ($(".body-color").scrollTop() > 100) {
        $(".applybtn-mob").show();
      }
      else {
        $(".applybtn-mob").hide();
      }
    });

  }

  ngDoCheck(): void {
    var objToken = this.eligibility.getSessionParams('CustToken');
    if (!this.validation.isNullEmptyUndefined(objToken)) {
      this.newToken = objToken.token;
    }
    if (this.newToken != this.oldToken) {
      this.oldToken = this.newToken;
      if (this.validation.isNullEmptyUndefined(this.newToken)) {
        this.isLoggedIn = false;
        this.MobileSiginBarFlag = true;
      }
      else {
        this.isLoggedIn = true;
        this.MobileSiginBarFlag = false;
      }
    }
  }



  otpToggle(event: Event, calltype?: any) {
    event.stopPropagation();
    this.ResetOTP();
    setTimeout(() => {
      if (calltype == 'login') {
        this.calltype = 'login';
        this.Login(event);
      }
      else {
          this.calltype = 'register';
          this.RegisterCust(event);
      }
    }, 0);
  }

  Login(event: Event) {
    if (this.validation.isNullEmptyUndefined(this.FormEmail.trim())) {
      this.toastr.error("Please enter a valid email");
    }
    else if (!this.validation.validateEmail(this.FormEmail.trim())) {
      this.toastr.error("Please enter valid Email id");
    }
    else {
      try {
        event.stopImmediatePropagation();
        let loginData = new FormData();
        loginData.append('email', this.FormEmail);
        this.api.post('auth/customer/login', loginData, false).subscribe(async response => {
          if (response.response.n == 1) {
            // console.log('response', response);
            this.isOTPSent = true;
            $("#mob_signin").modal("hide");
            this.resendbuttonText = "0:60";
            $("#Footerotp-screen").modal("show");
            this.toastr.success(response.response.Msg);
            // this.resendbuttonText = "0:60";
            this.countdownforOTP();
          }
          else {
            this.toastr.error(response.response.Msg);
            this.isOTPSent = false;
            // localStorage.clear();
            // this.route.navigate(['/']);
          }
        });
      }
      catch (ex) {
        // console.log(ex);
      }
    }
  }

  RegisterCust(event: Event) {
    if (this.validation.isNullEmptyUndefined(this.FormFirstName.trim())) {
      this.toastr.error("First Name is Mandatory");
    }
    else if (this.validation.isNullEmptyUndefined(this.FormLastName.trim())) {
      this.toastr.error("Last Name is Mandatory");
    }
    else if (this.validation.isNullEmptyUndefined(this.FormEmail.trim())) {
      this.toastr.error("Email id is Mandatory");
    }
    else if (!this.validation.validateEmail(this.FormEmail.trim())) {
      this.toastr.error("Please enter valid Email id");
    }
    else if (this.validation.isNullEmptyUndefined((this.FormMobileNo.toString()).trim())) {
      this.toastr.error("Mobile Number is Mandatory");
    }
    else if (!this.validation.validateMobileNumber(this.FormMobileNo.trim())) {
      this.toastr.error("Please enter valid Mobile number");
    }
    else {

      if (this.usertype == 'Customer') {
        this.UrlRegister = 'auth/customer/register';
      }
      else if (this.usertype == 'Partner') {
        this.UrlRegister = 'auth/agent/register';
      }
      try {
        event.stopImmediatePropagation();
        let registerData = new registerRequest();
        registerData.mobileNumber = this.FormMobileNo;
        registerData.email = this.FormEmail;
        registerData.firstName = this.FormFirstName;
        registerData.lastName = this.FormLastName;
        registerData.consent_id = 1;
        registerData.ip_address = '192.168.0.1';
        // registerData.agentType = 2;
        registerData.gender = 1;

        this.api.post(this.UrlRegister, registerData, false).subscribe(async response => {
          // console.log(response);
          if (response.response.n == 1) {
            this.toastr.success(response.response.Msg);
            // console.log(response);
            this.isOTPSent = true;
            $("#mob_signup").modal("hide");
            this.resendbuttonText = "0:60";
            $("#Footerotp-screen").modal("show");
            // this.resendbuttonText = "0:60";
            this.countdownforOTP();
          }
          else {
            this.toastr.error(response.response.Msg);
            this.isOTPSent = false;
            // localStorage.clear();
            // this.route.navigate(['/']);
          }
        });
      } catch (ex) {
        // console.log(ex);
      }
    }
  }

  ResetOTP() {
    this.footerotp1 = "";
    this.footerotp2 = "";
    this.footerotp3 = "";
    this.footerotp4 = "";
    this.footerotp5 = "";
    this.footerotp6 = "";
  }

  ResendtheOTP() {
    if (this.usertype == 'Customer') {
      this.UrlSendOTP = 'auth/customer/send-otp';
    }
    else if (this.usertype == 'Partner') {
      this.UrlSendOTP = 'auth/agent/loginWithOtp';
    }
    this.ResetOTP();
    const data = new FormData();
    data.append("email", this.FormEmail);
    this.api.post(this.UrlSendOTP, data, false).subscribe(response => {
      if (response.response.n == 1) {
        // console.log(response.data.otp);
        // this.toastr.success(response.data.otp);
        this.resendbuttonText = "0:60";
        this.countdownforOTP();
      }
      else {
        this.toastr.error(response.response.Msg);
      }
    })
  }

  countdownforOTP() {
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

  keytab(nextTabId: number, event: any) {
    let actionFlag = false;
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode < 96 || charCode > 105)) {
    }
    else if (charCode == 8) {
      // nextTabId--;
      if (nextTabId < 1) {
        nextTabId = 1;
      }
      nextTabId -= 2;
      actionFlag = true;
    }
    else {
      if (nextTabId > 6) {
        nextTabId = 6;
      }
      actionFlag = true;
    }
    // console.log("OTPfssf0",$('#footerotp'+(nextTabId -1)).val().length)
    if (actionFlag && $('#footerotp' + (nextTabId - 1)).val().length == 1) {
      const field = document.getElementById("footerotp" + nextTabId);
      if (field) {
        field.focus();
        field.click();
      }
    }
  }

  verifytheOtp() {
    if (this.usertype == 'Customer') {
      this.urlValidateOTP = 'auth/customer/ValidateOTP';
    }
    else if (this.usertype == 'Partner') {
      this.urlValidateOTP = 'auth/agent/loginOtpValidator';
    }
    var otp = this.footerotp1.toString() + this.footerotp2.toString() + this.footerotp3.toString() + this.footerotp4.toString() + this.footerotp5.toString() + this.footerotp6.toString();
    if (!this.validation.isNullEmptyUndefined(this.FormEmail) && otp.length == 6) {
      const data = new FormData();
      data.append("email", this.FormEmail);
      data.append("otp", otp); //this.otp1 + this.otp2 + this.otp3 + this.otp4 + this.otp5 + this.otp6);
      let sOTP = otp;
      // console.log(otp)
      this.api.post(this.urlValidateOTP, data).subscribe(response => {
        if (response.response.n == 1) {
          //console.log('signin', response);
          this.toastr.success("OTP Validation Success");
          $("#Footerotp-screen").modal("hide");
          this.isLoggedIn = true;
          if (!this.validation.isNullEmptyUndefined(response.data.token.customer)) {
            var encryptedTokenCustomer = { "token": response.data.token.customer };
            localStorage.setItem("CustToken", this.cryptoManager.Encrypt(encryptedTokenCustomer));
          }
          if (!this.validation.isNullEmptyUndefined(response.data.token.agent)) {
            var encryptedTokenAgent = { "token": response.data.token.agent };
            localStorage.setItem("AgentToken", this.cryptoManager.Encrypt(encryptedTokenAgent));
          }
          this.ResetModal();
          this.GetApplicantData();

          if (!this.validation.isNullEmptyUndefined(response.data.token.agent)) {
            // if (this.calltype == 'register') {
            //   this.GoToAgent('/agent-type')
            // }
            // else if (this.calltype == 'login') {
            //   this.GoToAgent('/overview');
            // }
            if (response.agentType.Insurance == true && (response.agentType.credit == true || response.agentType.wealth == true)) {
              this.redirect.GoToAAPTAgentCommon('/agent-overview', true, true);
            }
            else if (response.agentType.Insurance == true) {
              if (response.agentKyc.Insurance == true) {
                this.redirect.GoToAAPTAgentInsurance('/agent-insurance-dashboard', true, true);
              }
              else {
                this.redirect.GoToAAPTAgentInsurance('/agent-insurance-onboarding', true, true);
              }
            }
            else if (response.agentType.Insurance != true) {

              if (response.agentType.credit == true && response.agentType.wealth == true) {
                this.redirect.GoToAAPTAgentCommon('/agent-overview', true, true);
              }
              else if (response.agentType.credit == true) {
                if (response.agentKyc.credit == true) {
                  this.redirect.GoToAAPTAgentCommon('/agent-credit-dashboard', true);
                }
                else {
                  this.redirect.GoToAAPTAgentCommon('/agent-credit-onboarding', true);
                }
              }
              else if (response.agentType.wealth == true) {
                if (response.agentKyc.wealth == true) {
                  this.redirect.GoToAAPTAgentCommon('/agent-wealth-dashboard', true, true);
                }
                else {
                  this.redirect.GoToAAPTAgentCommon('/agent-wealth-onboarding', true, true);
                }
              }
              else {
                this.redirect.GoToAAPTAgentCommon('/agent-type', true, true);
              }
            }
          }
          else if (this.validation.isNullEmptyUndefined(response.data.token.agent)) {
            setTimeout(() => {
              // console.log('route url', this.route.url);
              if (this.route.url == '/') {
                this.redirect.GoToAAPTCommon('/overview', true, true);
              }
            }, 1000);
          }

          $("#mob_signin").modal("hide");
          $("#mob_signup").modal("hide");
          this.MobileSiginBarFlag = false;
        }
        else {
          this.toastr.error(response.response.Msg);
        }
      });
    } else {
      this.toastr.error("Please enter valid OTP.");
    }
  }

  ResetModal() {
    this.FormFirstName = "";
    this.FormLastName = "";
    this.FormEmail = "";
    this.FormMobileNo = "";
    this.otp1 = "";
  }

  GetApplicantData() {
    this.api.get("auth/customer/user", true).subscribe(response => {
      // console.log(response.data);
      localStorage.setItem("ApplicantData", this.cryptoManager.Encrypt(response.data));
    })
  }

}
