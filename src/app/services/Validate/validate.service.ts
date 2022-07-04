import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {
  public previousUrl = "";
  public currentUrl = "";

  constructor() { }

  isNullEmptyUndefined(value: string): boolean {
    if (value === null || value === "" || value === undefined)
      return true;
    else
      return false;
  }
  numberOnly(event: KeyboardEvent): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  alphabetOnly(event: any): boolean {
    var keyCode = (event.which) ? event.which : event.keyCode
    if ((keyCode < 65 || keyCode > 90) && (keyCode < 97 || keyCode > 123) && keyCode != 32) {
      return false;
    }
    return true;
  }
  validateEmail(email: any) {
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(String(email).toLowerCase());
  }
  updateNavigationUrl(CurrentUrl: string, PreviousUrl: string) {
    this.currentUrl = CurrentUrl;
    this.previousUrl = PreviousUrl;
  }
  validatePancard(pancard: any) {
    const regularExpression = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
    return regularExpression.test(String(pancard).toUpperCase());
  }
  validateAadharNumber(aadharNumber: any) {
    const regularExpression = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
    return regularExpression.test(String(aadharNumber).toLowerCase());
  }

  getCurrentDateWithSpecificFormat(date:any): string {
    let dateString;

    if(date == 1 || date == 21 || date == 31){
      dateString =  "st";
    }
    else if(date == 2 || date == 22){
      dateString = "nd";
    }
    else if(date == 3 || date == 23){
      dateString = "rd";
    }
    else{
      dateString = "th";
    }
    return dateString;
  }

}
