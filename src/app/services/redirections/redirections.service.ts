import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ValidateService } from '../validate/validate.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectionsService {
  // ng g s redirections
  // public redirect: RedirectionsService,

  Token: any;
  AToken: any;
  CommonUrl: any;
  CreditUrl: any;
  InsuranceUrl: any;
  WealthUrl: any;
  AgentCommonUrl: any;
  AgentInsuranceUrl: any;

  constructor(public validation: ValidateService) { }

  GoToAAPTCommon(PATH: any = '', TOKEN: boolean = false, ATOKEN: boolean = false, FROM: any = '') {
    this.CommonUrl = environment.CommonUrl;
    this.AToken = localStorage.getItem("AgentToken");
    this.Token = localStorage.getItem("CustToken");

    if (TOKEN && !this.validation.isNullEmptyUndefined(this.Token)) {
      this.CommonUrl = this.CommonUrl.replace("{TOKEN}", encodeURIComponent(this.Token));
    }
    if (ATOKEN && !this.validation.isNullEmptyUndefined(this.AToken)) {
      this.CommonUrl = this.CommonUrl.replace("{ATOKEN}", encodeURIComponent(this.AToken));
    }
    if (!this.validation.isNullEmptyUndefined(PATH)) {
      this.CommonUrl = this.CommonUrl.replace("{PATH}", encodeURIComponent(PATH));
    }
    if (!this.validation.isNullEmptyUndefined(FROM)) {
      this.CommonUrl = this.CommonUrl.replace("{FROM}", encodeURIComponent(FROM));
    }

    console.log('GoToAAPTCommon', this.CommonUrl);
    window.location.href = this.CommonUrl;
  }

  GoToAAPTCredit(PATH: any = '', TOKEN: boolean = false) {
    this.CreditUrl = environment.CreditUrl;
    this.AToken = localStorage.getItem("AgentToken");
    this.Token = localStorage.getItem("CustToken");

    if (TOKEN && !this.validation.isNullEmptyUndefined(this.Token)) {
      this.CreditUrl = this.CreditUrl.replace("{TOKEN}", encodeURIComponent(this.Token));
    }
    if (!this.validation.isNullEmptyUndefined(PATH)) {
      this.CreditUrl = this.CreditUrl.replace("{PATH}", encodeURIComponent(PATH));
    }

    console.log('GoToAAPTCredit', this.CreditUrl);
    window.location.href = this.CreditUrl;
  }

  GoToAAPTInsurance(PATH: any = '', TOKEN: boolean = false) {
    this.InsuranceUrl = environment.InsuranceUrl;
    this.AToken = localStorage.getItem("AgentToken");
    this.Token = localStorage.getItem("CustToken");

    if (TOKEN && !this.validation.isNullEmptyUndefined(this.Token)) {
      this.InsuranceUrl = this.InsuranceUrl.replace("{TOKEN}", encodeURIComponent(this.Token));
    }
    if (!this.validation.isNullEmptyUndefined(PATH)) {
      this.InsuranceUrl = this.InsuranceUrl.replace("{PATH}", encodeURIComponent(PATH));
    }

    console.log('GoToAAPTInsurance', this.InsuranceUrl);
    window.location.href = this.InsuranceUrl;
  }

  GoToAAPTWealth(PATH: any = '', TOKEN: boolean = false, DG: boolean = false) {
    debugger
    this.WealthUrl = environment.WealthUrl;
    this.AToken = localStorage.getItem("AgentToken");
    this.Token = localStorage.getItem("CustToken");

    if (TOKEN && !this.validation.isNullEmptyUndefined(this.Token)) {
      this.WealthUrl = this.WealthUrl.replace("{TOKEN}", encodeURIComponent(this.Token));
    }
    if (!this.validation.isNullEmptyUndefined(PATH)) {
      this.WealthUrl = this.WealthUrl.replace("{PATH}", encodeURIComponent(PATH));
    }
    if (DG) {
      this.WealthUrl = this.WealthUrl.replace("{DG}", "true")
    }

    console.log('GoToAAPTWealth', this.WealthUrl);
    window.location.href = this.WealthUrl;
  }

  GoToAAPTAgentCommon(PATH: any = '', TOKEN: boolean = false, ATOKEN: boolean = false) {
    debugger
    this.AgentCommonUrl = environment.AgentCommonUrl;
    this.AToken = localStorage.getItem("AgentToken");
    this.Token = localStorage.getItem("CustToken");

    if (TOKEN && !this.validation.isNullEmptyUndefined(this.Token)) {
      this.AgentCommonUrl = this.AgentCommonUrl.replace("{TOKEN}", encodeURIComponent(this.Token));
    }
    if (ATOKEN && !this.validation.isNullEmptyUndefined(this.AToken)) {
      this.AgentCommonUrl = this.AgentCommonUrl.replace("{ATOKEN}", encodeURIComponent(this.AToken));
    }
    if (!this.validation.isNullEmptyUndefined(PATH)) {
      this.AgentCommonUrl = this.AgentCommonUrl.replace("{PATH}", encodeURIComponent(PATH));
    }

    console.log('GoToAAPTAgentCommon', this.AgentCommonUrl);
    window.location.href = this.AgentCommonUrl;
  }

  GoToAAPTAgentInsurance(PATH: any = '', TOKEN: boolean = false, ATOKEN: boolean = false) {
    this.AgentInsuranceUrl = environment.AgentInsuranceUrl;
    this.AToken = localStorage.getItem("AgentToken");
    this.Token = localStorage.getItem("CustToken");

    if (TOKEN && !this.validation.isNullEmptyUndefined(this.Token)) {
      this.AgentInsuranceUrl = this.AgentInsuranceUrl.replace("{TOKEN}", encodeURIComponent(this.Token));
    }
    if (ATOKEN && !this.validation.isNullEmptyUndefined(this.AToken)) {
      this.AgentInsuranceUrl = this.AgentInsuranceUrl.replace("{ATOKEN}", encodeURIComponent(this.AToken));
    }
    if (!this.validation.isNullEmptyUndefined(PATH)) {
      this.AgentInsuranceUrl = this.AgentInsuranceUrl.replace("{PATH}", encodeURIComponent(PATH));
    }

    console.log('GoToAAPTAgentInsurance', this.AgentInsuranceUrl);
    window.location.href = this.AgentInsuranceUrl;
  }

}
