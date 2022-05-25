import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { registerRequest } from 'src/app/models/registerRequest.model';
import { ApiService } from 'src/app/services/api/api.service';
import { AescryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { EligibilityService } from 'src/app/services/eligibility/eligibility.service';
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
  FormEmail: any;
  FormPassword: any;
  FormFirstName: any;
  FormLastName: any;
  FormMobileNo: any;
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
  CreditUrl = environment.CreditUrl;
  InsuranceUrl = environment.InsuranceUrl;
  WealthUrl = environment.WealthUrl;
  CommonUrl = environment.CommonUrl;
  AgentUrl = environment.AgentUrl;
  calltype: any;
  usertype: any = 'Customer';
  UrlRegister: any = 'auth/customer/register';
  UrlSendOTP: any = 'auth/customer/send-otp';
  urlValidateOTP: any = 'auth/customer/ValidateOTP';

  constructor(public api: ApiService, public validation: ValidateService, public toastr: ToastrService, public route: Router, private cryptoManager: AescryptoService, public eligibility: EligibilityService) { }

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


  CreditRouterUrl(Path: any) {
    this.Token = localStorage.getItem("CustToken");
    this.CreditUrl = environment.CreditUrl.replace("{TOKEN}", encodeURIComponent(this.Token));
    this.CreditUrl = this.CreditUrl.replace("{PATH}", encodeURIComponent(Path));
    window.location.href = this.CreditUrl;
  }

  InsurancetRouterUrl(Path: any) {
    this.Token = localStorage.getItem("CustToken");
    this.InsuranceUrl = environment.InsuranceUrl.replace("{TOKEN}", encodeURIComponent(this.Token));
    this.InsuranceUrl = this.InsuranceUrl.replace("{PATH}", encodeURIComponent(Path));
    window.location.href = this.InsuranceUrl;
  }
  wealthtRouterUrl(Path: any) {
    this.Token = localStorage.getItem("CustToken");
    this.WealthUrl = environment.WealthUrl.replace("{TOKEN}", encodeURIComponent(this.Token));
    this.WealthUrl = this.WealthUrl.replace("{PATH}", encodeURIComponent(Path));
    window.location.href = this.WealthUrl;
  }
  CommontRouterUrl(Path: any) {
    this.Token = localStorage.getItem("CustToken");
    this.CommonUrl = environment.CommonUrl.replace("{TOKEN}", encodeURIComponent(this.Token));
    this.CommonUrl = this.CommonUrl.replace("{PATH}", encodeURIComponent(Path));
    window.location.href = this.CommonUrl;
  }
  GoToAgent(para: any) {
    this.AToken = localStorage.getItem("AgentToken");
    this.AgentUrl = environment.AgentUrl.replace("{ATOKEN}", encodeURIComponent(this.AToken));
    this.AgentUrl = this.AgentUrl.replace("{PATH}", encodeURIComponent(para));
    window.location.href = this.AgentUrl;
  }

  otpToggle(event: Event, calltype?: any) {
    event.stopPropagation();
    if (this.validation.isNullEmptyUndefined(this.FormEmail)) {
      this.toastr.error("Please enter a valid email");
    }
    else {
      if (calltype == 'login') {
        this.isOTPSent = true;
        this.calltype = 'login';
        this.Login(event);
      }
      else {
        if (this.validation.isNullEmptyUndefined(this.FormEmail) || this.validation.isNullEmptyUndefined(this.FormFirstName) || this.validation.isNullEmptyUndefined(this.FormLastName) || this.validation.isNullEmptyUndefined(this.FormMobileNo) || this.FormCheckbox == 0) {
          this.toastr.error("All fields are mandatory");
        } else {
          this.isOTPSent = true;
          this.calltype = 'register';
          this.RegisterCust(event);
        }
      }
    }
  }

  Login(event: Event) {
    try {
      event.stopImmediatePropagation();
      let loginData = new FormData();
      loginData.append('email', this.FormEmail);
      this.api.post('auth/customer/login', loginData, false).subscribe(async response => {
        if (response.response.n == 1) {
          console.log('response', response);
          $("#mob_signin").modal("hide");
          this.resendbuttonText = "2:30";
          $("#Footerotp-screen").modal("show");
          this.toastr.success(response.response.Msg);
          // this.resendbuttonText = "2:30";
          this.countdownforOTP();
        }
        else {
          this.toastr.error(response.response.Msg);
          localStorage.clear();
          this.route.navigate(['/']);
        }
      });
    }
    catch (ex) {
      console.log(ex);
    }
  }

  RegisterCust(event: Event) {
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
      registerData.agentType = 2;
      registerData.gender = 1;

      this.api.post(this.UrlRegister, registerData, false).subscribe(async response => {
        console.log(response);
        if (response.response.n == 1) {
          this.toastr.success(response.response.Msg);
          console.log(response);
          $("#mob_signup").modal("hide");
          this.resendbuttonText = "2:30";
          $("#Footerotp-screen").modal("show");
          // this.resendbuttonText = "2:30";
          this.countdownforOTP();
        }
        else {
          this.toastr.error(response.response.Msg);
          localStorage.clear();
          this.route.navigate(['/']);
        }
      });
    } catch (ex) {
      console.log(ex);
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
        console.log(response.data.otp);
        // this.toastr.success(response.data.otp);
        this.resendbuttonText = "2:30";
        this.countdownforOTP();
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
            if (this.calltype == 'register') {
              this.GoToAgent('/agent-type')
            }
            else if (this.calltype == 'login') {
              this.GoToAgent('/overview');
            }
          }
          else if (this.validation.isNullEmptyUndefined(response.data.token.agent)) {
            setTimeout(() => {
              console.log('route url', this.route.url);
              if (this.route.url == '/') {
                this.CommontRouterUrl('/overview');
              }
            }, 1000);
          }


          // this.CommontRouterUrl('/overview');
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
      // console.log(response.user);
      localStorage.setItem("ApplicantData", this.cryptoManager.Encrypt(response.data));
    })
  }

}
