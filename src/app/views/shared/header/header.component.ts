import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { registerRequest } from 'src/app/models/registerRequest.model';
import { ApiService } from 'src/app/services/api/api.service';
import { AescryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { EligibilityService } from 'src/app/services/eligibility/eligibility.service';
import { ValidateService } from 'src/app/services/validate/validate.service';
import { environment } from 'src/environments/environment';
declare var $:any;
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
  otp1: any;
  oldToken: any;
  newToken: any;

  WealthUrl = environment.WealthUrl;
  InsuranceUrl = environment.InsuranceUrl;
  CommonUrl = environment.CommonUrl;
  CreditUrl = environment.CreditUrl;

  constructor(public validation: ValidateService, private toastr: ToastrService, private route: Router, private api: ApiService, private cryptoManager: AescryptoService, private eligibility: EligibilityService) {}

  ngDoCheck(): void {
    var objToken = this.eligibility.getSessionParams('CustToken');
    if(!this.validation.isNullEmptyUndefined(objToken)){
      this.newToken = objToken.token;
    }
    if(this.newToken != this.oldToken){
      this.oldToken = this.newToken;
      if(this.validation.isNullEmptyUndefined(this.newToken)){
        this.isLoggedIn = false;
      }
      else{
        this.isLoggedIn = true;
      }
    }
  }

  ngOnInit(): void {
    $(".login-popup").on('click',function(e:any){
			e.stopPropagation();
		});
    $(".open-signup").click(function(){
			$(".sign-up").show();
			$(".sign-in").hide();

		});
		$(".open-sigin").click(function(){
			$(".sign-in").show();
			$(".sign-up").hide();
		});
    var authToken = localStorage.getItem('userAuthToken') || '';
    if (this.validation.isNullEmptyUndefined(authToken)) {
      this.isLoggedIn = false;
    }
    else{
      this.isLoggedIn = true;
    }
    var self=this;
    $("#site-backdrop").click(function(){
     self.handleOpenCloseNav();     
    });
    console.log("Common Uerl",this.CommonUrl);

  }

  handleOpenCloseNav(){
    if (document.getElementById("site-wrapper-menu")!.classList.contains("show-nav")) {
      document.getElementById("site-wrapper-menu")!.classList.remove("show-nav");
      $("#site-backdrop").css("display" , "none");
    }else{
      document.getElementById("site-wrapper-menu")!.classList.add("show-nav");
      $("#site-backdrop").css("display" , "block");
    }
  }


  otpToggle(event: Event, calltype?: any) {
    event.stopPropagation();
    //this.submitbtnLoading = true;
    if (this.validation.isNullEmptyUndefined(this.FormEmail)) {
      this.toastr.error("Please enter a valid email");
    }
    else {
      this.isOTPSent = true;
      if (calltype == 'login') {
        this.Login(event);
      }
      else {
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
          console.log('response',response)
          this.toastr.success(response.response.Msg);
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
    try {
      event.stopImmediatePropagation();
      let registerData = new registerRequest();
      registerData.mobileNumber = this.FormMobileNo;
      registerData.email = this.FormEmail;
      registerData.firstName = this.FormFirstName;
      registerData.lastName = this.FormLastName;

      this.api.post('auth/customer/register', registerData, false).subscribe(async (response: any) => {
        console.log(response);
        if (response.response.n == 1) {
          this.toastr.success(response.response.Msg);
          console.log(response);
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

  Logout(){
    this.isLoggedIn = false;
    localStorage.clear();
  }

  async verifyOtpBtn(){
    await this.verifyOtp();
    this.GetApplicantData();
  }

  async verifyOtp() {
    return new Promise(async (resolve, reject) => {    
    if (!this.validation.isNullEmptyUndefined(this.otp1) && !this.validation.isNullEmptyUndefined(this.FormEmail) && this.otp1.length == 6) {
      const data = new FormData();
      data.append("email", this.FormEmail);
      data.append("otp", this.otp1); //this.otp1 + this.otp2 + this.otp3 + this.otp4 + this.otp5 + this.otp6);
      let sOTP = this.otp1;

      this.api.post('auth/customer/ValidateOTP',data).subscribe(async (response: any)=>{
        if (response.response.n == 1) {
          console.log('signin',response);
          this.toastr.success("OTP Validation Success");
          this.isLoggedIn = true;
          var encryptedToken={"token":response.data.token};
          localStorage.setItem("CustToken",this.cryptoManager.Encrypt(encryptedToken));
          this.ResetModal();
          resolve(response);
        }
        else{
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

  ResetModal(){
    this.FormFirstName="";
    this.FormLastName="";
    this.FormEmail="";
    this.FormMobileNo="";
    this.otp1="";    
  }

  
  GetApplicantData(){
    this.api.get("auth/customer/user", true).subscribe(async (response: any)=>{
      debugger;
      console.log(response.user);
      localStorage.setItem("ApplicantData",this.cryptoManager.Encrypt(response.user));
    })
  }



}
