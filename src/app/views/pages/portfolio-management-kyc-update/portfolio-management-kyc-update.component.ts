import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';
import { AescryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ValidateService } from 'src/app/services/validate/validate.service';
declare var $: any;

@Component({
  selector: 'app-portfolio-management-kyc-update',
  templateUrl: './portfolio-management-kyc-update.component.html',
  styleUrls: ['./portfolio-management-kyc-update.component.css']
})
export class PortfolioManagementKycUpdateComponent implements OnInit {

  otp1: string = "";
  otp2: string = "";
  otp3: string = "";
  otp4: string = "";
  otp5: string = "";
  otp6: string = "";

  ApplicantData: any = {
    "First_Name": "",
    "Last_Name": "",
    "Mob_Number": "",
    "Email_Id": "",
    "Checked_Terms": ""

  }


  constructor(private router: Router, private toastr: ToastrService, public validate: ValidateService, private crypto: AescryptoService, private api: ApiService) { }

  ngOnInit(): void {
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
    if (actionFlag) {
      const field = document.getElementById("otp" + nextTabId);
      if (field) {
        field.focus();
        field.click();
      }
    }
  }

  Navigate() {
    this.router.navigateByUrl("/portfolio-management-product-listing");
    $('.modal-backdrop').remove();
  }

  ShowOTP() {
    if (this.validate.isNullEmptyUndefined(this.ApplicantData.First_Name)) {
      this.toastr.error('First name is mandatory');
    }
    else if (this.validate.isNullEmptyUndefined(this.ApplicantData.Last_Name)) {
      this.toastr.error('Last name is mandatory');
    }
    else if (this.validate.isNullEmptyUndefined(this.ApplicantData.Mob_Number)) {
      this.toastr.error('Mobile number is mandatory');
    }
    else if (this.validate.isNullEmptyUndefined(this.ApplicantData.Email_Id)) {
      this.toastr.error('Email ID is mandatory');
    }
    else if (!this.validate.validateEmail(this.ApplicantData.Email_Id)) {
      this.toastr.error('Please enter valid Email ID');
    }
    else if (this.validate.isNullEmptyUndefined(this.ApplicantData.Checked_Terms)) {
      this.toastr.error('Please agree terms and conditions');
    }
    else {
      $("#otp-screen").modal("show");
    }
  }

}
