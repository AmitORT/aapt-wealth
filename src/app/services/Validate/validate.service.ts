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
  DesimalOnly(event: KeyboardEvent, value: string): boolean {
    // debugger
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
      return false;
    }
    if (value != undefined) {
      if (value.indexOf('.') > -1 && charCode === 46) {
        return false;
      }
    }
    return true;
  }

  toFixed(value:any,event:any){
    debugger
    value = parseFloat(value);
    var isInteger = Number.isInteger(value);
    if(!isInteger){
      var spval = String(value).split(".");
      if(spval[1].length > 4){
        return value;
      }
    }
    else{
      return value;
    }
  }

  validateEmail(email: any) {
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(String(email).toLowerCase());
  }

  validateMobileNumber(number: any) {
    const regularExpression = /^[6-9]\d{9}$/;
    return regularExpression.test(String(number).toLowerCase());
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
  validateAccountNumber(accountNumber: any) {
    const regularExpression = /^\d{9,18}$/;
    return regularExpression.test(String(accountNumber));
  }
  validateIFSCCode(accountNumber: any) {
    const regularExpression = /^[A-Za-z]{4}\d{7}$/;
    return regularExpression.test(String(accountNumber).toUpperCase());
  }

  getCurrentDateWithSpecificFormat(date: any): string {
    let dateString;
    if (date == 1 || date == 21 || date == 31) {
      dateString = "st";
    }
    else if (date == 2 || date == 22) {
      dateString = "nd";
    }
    else if (date == 3 || date == 23) {
      dateString = "rd";
    }
    else {
      dateString = "th";
    }
    return dateString;
  }

  amountWithLakhComma(value: string): string {
    value = value.toString();
    let valueDecimalSeprated = value.split('.');
    let AfterDecimal = "";
    if (valueDecimalSeprated.length > 0) {
      AfterDecimal = valueDecimalSeprated[1];
      value = valueDecimalSeprated[0];
    }
    value = value.replace(/,/g, '').split('').reverse().join('');//value.replace(',','');
    let valueLen = value.length;
    let pointer = 0;
    var str = new String(value);
    let LastChar = str.charAt(0);
    value = value.substring(1);
    for (let i = 0; i < valueLen; i++) {
      if (i % 2 === 0 && i < valueLen - 1 && i !== 0) {
        value = value.slice(0, i + pointer) + ',' + value.slice(i + pointer, valueLen + pointer);
        pointer++;
      }
    }
    return this.isNullEmptyUndefined(AfterDecimal) ? value.split('').reverse().join('') + LastChar : value.split('').reverse().join('') + LastChar + "." + AfterDecimal;
  }

  indianRupeeFormat(val: any) {
    return Number(val).toLocaleString('en-IN');
  }

  GetMonthText(val : any){
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    return month[val];
  }

  getAge(value: string) {
    let timeDiff = Math.abs(Date.now() - new Date(value).getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
    return age;
  }

  checkLessThanCurrentDate(date:any){
    // check for less than current date 
    var today = new Date();
    var todaydd = today.getDate();
    var todaymm = today.getMonth(); 
    var todayyyyy = today.getFullYear();
    var selecteddate = new Date(date);
    var selecteddd = selecteddate.getDate();
    var selectedmm = selecteddate.getMonth(); 
    var selectedyyyy = selecteddate.getFullYear();

    var dateOne = new Date(todayyyyy, todaymm, todaydd);     
    var dateTwo = new Date(selectedyyyy, selectedmm, selecteddd);

    if(dateTwo < dateOne){
      return true;
    }
    else{
      return false;
    }
  }

  checkTwoDateComparison(startdate: any, enddate: any, diffdays: any) {
    var selectedstartdate = new Date(startdate);
    selectedstartdate.setDate(selectedstartdate.getDate() + diffdays);
    var todaydd = selectedstartdate.getDate();
    var todaymm = selectedstartdate.getMonth();
    var todayyyyy = selectedstartdate.getFullYear();

    var selectedenddate = new Date(enddate);
    var selecteddd = selectedenddate.getDate();
    var selectedmm = selectedenddate.getMonth();
    var selectedyyyy = selectedenddate.getFullYear();

    var dateOne = new Date(todayyyyy, todaymm, todaydd);
    var dateTwo = new Date(selectedyyyy, selectedmm, selecteddd);

    if (dateOne > dateTwo) {
      return true;
    }
    else {
      return false;
    }
  }

}
