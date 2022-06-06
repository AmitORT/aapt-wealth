import { Component, DoCheck, OnInit } from '@angular/core';
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
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {

  isOTPSent: any = false;
  isLoggedIn: any = false;
  FormEmail: any;
  FormPassword: any;
  FormFirstName: any;
  FormLastName: any;
  FormMobileNo: any;
  oldToken: any;
  newToken: any;
  otp1: any;
  interval: any;
  resendbuttonText = 'Resend OTP';
  WealthUrl = environment.WealthUrl;
  InsuranceUrl = environment.InsuranceUrl;
  CommonUrl = environment.CommonUrl;
  CreditUrl = environment.CreditUrl;
  AgentUrl = environment.AgentUrl;
  headotp1: string = "";
  headotp2: string = "";
  headotp3: string = "";
  headotp4: string = "";
  headotp5: string = "";
  headotp6: string = "";
  Token: any;
  AToken: any
  WealthdashboardURL = '/wealth-dashboard';
  ToolsSipUrl = '/tools-sip';
  ToolsEmiUrl = '/tools-emi';
  ToolsGoalUrl = '/create-goal';
  ProfileUrl = '/profile-details';
  commonDashboardUrl = '/overview';
  event$: any;
  calltype: any;
  usertype: any = 'Customer';
  UrlRegister: any = 'auth/customer/register';
  UrlSendOTP: any = 'auth/customer/send-otp';
  urlValidateOTP: any = 'auth/customer/ValidateOTP';

  constructor(public validation: ValidateService, private toastr: ToastrService, private route: Router, private api: ApiService, private cryptoManager: AescryptoService, private eligibility: EligibilityService) { }

  ngDoCheck(): void {

    var objToken = this.eligibility.getSessionParams('CustToken');
    if (!this.validation.isNullEmptyUndefined(objToken)) {
      this.newToken = objToken.token;
    }
    if (this.newToken != this.oldToken) {
      this.oldToken = this.newToken;
      if (this.validation.isNullEmptyUndefined(this.newToken)) {
        this.isLoggedIn = false;
      }
      else {
        this.isLoggedIn = true;
      }
    }
  }

  ngOnInit(): void {
    $(".login-popup").on('click', function (e: any) {
      e.stopPropagation();
    });
    $(".open-signup").click(function () {
      $(".sign-up").show();
      $(".sign-in").hide();

    });
    $(".open-sigin").click(function () {
      $(".sign-in").show();
      $(".sign-up").hide();
    });

    this.resendbuttonText = "2:30"

    this.countdown();

    var authToken = localStorage.getItem('userAuthToken') || '';
    if (this.validation.isNullEmptyUndefined(authToken)) {
      this.isLoggedIn = false;
    }
    else {
      this.isLoggedIn = true;
    }
    var self = this;
    $("#site-backdrop").click(function () {
      self.handleOpenCloseNav();
    });
    console.log("Common Uerl", this.CommonUrl);

  }

  GoToCommon(para: any) {

    this.Token = localStorage.getItem("CustToken");
    // console.log("Token",this.Token)
    this.CommonUrl = environment.CommonUrl.replace("{TOKEN}", encodeURIComponent(this.Token));
    if (para == 'Dashboard') {
      this.CommonUrl = this.CommonUrl.replace("{PATH}", encodeURIComponent(this.WealthdashboardURL));
    }
    if (para == 'tools-sip') {
      this.CommonUrl = this.CommonUrl.replace("{PATH}", encodeURIComponent(this.ToolsSipUrl));
    }
    if (para == 'tools-emi') {
      this.CommonUrl = this.CommonUrl.replace("{PATH}", encodeURIComponent(this.ToolsEmiUrl));
    }
    if (para == 'tools-goal') {
      this.CommonUrl = this.CommonUrl.replace("{PATH}", encodeURIComponent(this.ToolsGoalUrl));
    }
    if (para == 'profile') {
      this.CommonUrl = this.CommonUrl.replace("{PATH}", encodeURIComponent(this.ProfileUrl));
    }
    if (para == 'overview') {
      this.CommonUrl = this.CommonUrl.replace("{PATH}", encodeURIComponent(this.commonDashboardUrl));
    }

    // console.log("CommonUrl",this.CommonUrl)
    window.location.href = this.CommonUrl;
  }

  GoToAgent(para: any) {
    this.AToken = localStorage.getItem("AgentToken");
    this.AgentUrl = environment.AgentUrl.replace("{ATOKEN}", encodeURIComponent(this.AToken));
    this.AgentUrl = this.AgentUrl.replace("{PATH}", encodeURIComponent(para));
    window.location.href = this.AgentUrl;
  }

  GotoInsurance() {
    this.Token = localStorage.getItem("CustToken");
    this.InsuranceUrl = environment.InsuranceUrl.replace("{TOKEN}", encodeURIComponent(this.Token));
    window.location.href = this.InsuranceUrl;
  }

  GotoCredit() {
    debugger;
    this.Token = localStorage.getItem("CustToken");
    this.CreditUrl = environment.CreditUrl.replace("{TOKEN}", encodeURIComponent(this.Token));
    window.location.href = this.CreditUrl;
  }

  handleOpenCloseNav() {
    if (document.getElementById("site-wrapper-menu")!.classList.contains("show-nav")) {
      document.getElementById("site-wrapper-menu")!.classList.remove("show-nav");
      $("#site-backdrop").css("display", "none");
    } else {
      document.getElementById("site-wrapper-menu")!.classList.add("show-nav");
      $("#site-backdrop").css("display", "block");
    }
  }


  otpToggle(event: Event, calltype?: any) {
    event.stopPropagation();
    //this.submitbtnLoading = true;
    if (this.validation.isNullEmptyUndefined(this.FormEmail)) {
      this.toastr.error("Please enter a valid email");
    }
    else {      
      if (calltype == 'login') {
        this.calltype = 'login';
        this.Login(event);
      }
      else {
        this.calltype = 'register';
        this.RegisterCust(event);
      }
    }
  }

  Login(event: Event) {
    try {
      event.stopImmediatePropagation();
      let loginData = new FormData();
      loginData.append('email', this.FormEmail);
      this.api.post('auth/customer/login', loginData, false).subscribe(async (response: any) => {
        if (response.response.n == 1) {
          this.isOTPSent = true;
          $("#headerotp-screen").modal("show");
          this.resendbuttonText = "2:30"
          this.countdown();
          console.log('response', response)
          this.toastr.success(response.response.Msg);
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

      this.api.post(this.UrlRegister, registerData, false).subscribe(async (response: any) => {
        console.log(response);
        if (response.response.n == 1) {
          this.isOTPSent = true;
          $("#headerotp-screen").modal("show");
          this.resendbuttonText = "2:30"
          this.countdown();
          this.toastr.success(response.response.Msg);
          console.log(response);
        }
        else {
          this.toastr.error(response.response.Msg);
          this.isOTPSent = false;
          // localStorage.clear();
          // this.route.navigate(['/']);
        }
      });
    } catch (ex) {
      console.log(ex);
    }
  }


  Logout() {
    this.isLoggedIn = false;
    localStorage.clear();
    this.handleOpenCloseNav();
  }

  async verifyOtpBtn() {
    await this.verifyOtp();
    // this.GetApplicantData();
  }

  async verifyOtp() {
    if (this.usertype == 'Customer') {
      this.urlValidateOTP = 'auth/customer/ValidateOTP';
    }
    else if (this.usertype == 'Partner') {
      this.urlValidateOTP = 'auth/agent/loginOtpValidator';
    }

    return new Promise(async (resolve, reject) => {
      var otp = this.headotp1.toString() + this.headotp2.toString() + this.headotp3.toString() + this.headotp4.toString() + this.headotp5.toString() + this.headotp6.toString();
      // console.log("otp",otp)
      if (!this.validation.isNullEmptyUndefined(this.FormEmail) && otp.length == 6) {
        const data = new FormData();
        data.append("email", this.FormEmail);
        data.append("otp", otp); //this.otp1 + this.otp2 + this.otp3 + this.otp4 + this.otp5 + this.otp6);
        let sOTP = otp;

        this.api.post('auth/customer/ValidateOTP', data).subscribe(async response => {
          debugger;
          console.log('login', response);
          if (response.response.n == 1) {
            console.log('VerifyOTP', response);
            this.toastr.success("OTP Validation Success");
            $("#headerotp-screen").modal("hide");
            this.isLoggedIn = true;

            if (!this.validation.isNullEmptyUndefined(response.data.token.customer)) {
              var encryptedTokenCustomer = { "token": response.data.token.customer };
              // console.log("encryptedTokenCustomer", encryptedTokenCustomer)
              localStorage.setItem("CustToken", this.cryptoManager.Encrypt(encryptedTokenCustomer));
            }
            if (!this.validation.isNullEmptyUndefined(response.data.token.agent)) {
              var encryptedTokenAgent = { "token": response.data.token.agent };
              localStorage.setItem("AgentToken", this.cryptoManager.Encrypt(encryptedTokenAgent));
            }

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
                // if (this.route.url == '/') {
                //   this.GoToCommon('overview');
                // } have to uncomment.
              }, 1000);
            }

            // 

            //  this.GoToCommon('overview'); 

            this.ResetModal();
            resolve(response);
          }
          else {
            this.toastr.error(response.response.Msg);
            reject(response);
          }
        });
      } else {
        this.toastr.error("Please enter valid OTP.");
        reject(0);
      }
    });
  }

  ResetModal() {
    this.FormFirstName = "";
    this.FormLastName = "";
    this.FormEmail = "";
    this.FormMobileNo = "";
    this.otp1 = "";
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

  EditEmail() {
    $('#otp-screen').modal('hide');
    $('#email-id').focus();
  }

  EditNumber() {
    $('#headerotp-screen').modal('hide');
    $('#loginReg').trigger('click');
    $('#FormEmail').focus();
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
      const field = document.getElementById("headotp" + nextTabId);
      if (field) {
        field.focus();
        field.click();
      }
    }
  }

  ResetOTP() {
    this.headotp1 = "";
    this.headotp2 = "";
    this.headotp3 = "";
    this.headotp4 = "";
    this.headotp5 = "";
    this.headotp6 = "";
  }

  ResendOTP() {
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
        this.toastr.success(response.data.otp);
        this.resendbuttonText = "2:30"
        this.countdown();
      }
    })
  }


  GetApplicantData() {
    this.api.get("auth/customer/user", true).subscribe(async (response: any) => {
      debugger;
      console.log(response.user);
      localStorage.setItem("ApplicantData", this.cryptoManager.Encrypt(response.user));
    })
  }



}
