import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { AescryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ValidateService } from 'src/app/services/validate/validate.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-mutual-fund-cart',
  templateUrl: './mutual-fund-cart.component.html',
  styleUrls: ['./mutual-fund-cart.component.css']
})
export class MutualFundCartComponent implements OnInit {
  // [x: string]: any;

  SelectedButton: boolean = false;
  SelectedButton1: boolean = false;
  SelectedButton2: boolean = false;
  SelectedButton3: boolean = false;
  SelectedButton4: boolean = false;
  ShowSelectedDetails: boolean = false;
  ModeOfInvestment: any;
  ProductOverview: any;
  date: any;
  SelectedGoal: any;

  ProceedCart: any;
  InvestWithoutGoal: any
  ConfirmedCart: any;
  BankNames: any;
  selectedBank:any;

  // uniqueID:

  constructor(public route: Router, public validate: ValidateService, private crypto: AescryptoService, private api: ApiService, private toastr: ToastrService) { }


  ngOnInit(): void {

    if (localStorage.getItem("ModeOfInvestment") != null) {
      this.ModeOfInvestment = this.crypto.Decrypt(localStorage.getItem("ModeOfInvestment"));
      console.log("ModeOfInvestment", this.ModeOfInvestment)
    }

    this.ProductOverview = this.crypto.Decrypt(localStorage.getItem("ProductOverview"));
    console.log("ProductOverview", this.ProductOverview)

    // if(localStorage.getItem("InvestWithoutGoal") != null){
    this.InvestWithoutGoal = this.crypto.Decrypt(localStorage.getItem("InvestWithoutGoal"));
    console.log("InvestWithoutGoal", this.InvestWithoutGoal)
    // }

    

    // this.SelectedGoal = this.crypto.Decrypt(localStorage.getItem('GetSelectedGoals'));
    // console.log('SelectedGoal', this.SelectedGoal)

    // let encrypted=this.crypto.Encrypt(this.ModeOfInvestment);
    // localStorage.setItem("ModeOfInvestment",encrypted);

    if (localStorage.getItem("ProceedCart") != null) {
      this.ProceedCart = this.crypto.Decrypt(localStorage.getItem("ProceedCart"));
      console.log("GotProceedCart", this.ProceedCart)
    }



  }

  CompareProduct() {
    $('#compare-products-modal').modal('hide');
    this.ShowSelectedDetails = true;
  }

  RedirectPopup() {
    $('#compare-products-modal').modal('hide');
    this.route.navigate(['/wealth-product-listing']);
  }

  GetOnlyDay() {
    this.ModeOfInvestment.DateForMonth = this.ModeOfInvestment.DateForMonth.slice(8);
  }

  GetBackToFunds() {
    let encrypted = this.crypto.Encrypt(this.ModeOfInvestment);
    localStorage.setItem("ModeOfInvestment", encrypted);
    this.route.navigate(["/mutual-select-goal"])
    console.log("ChangesDataofMutualInvest", this.ModeOfInvestment)
  }

  GetBankDetails() {
    this.api.get("bankDetails/get-banks", true).subscribe(resp => {
      if (resp.response.n == 1) {
        this.BankNames = resp.data;
        console.log("BankNames", this.BankNames)
      }
    })
  }

  AddCart(index: number, ID: any) {
    for (let i = 0; i < this.BankNames.length; i++) {
      if (this.BankNames[i].id == ID) {
        this.BankNames[i].SelectedButton = !this.BankNames[i].SelectedButton;
      }
    }
  }

  GetSelectedBank(index:number){
    this.BankNames[index].selectBank=!this.BankNames[index].selectBank;

    this.selectedBank=this.BankNames.filter((a:any)=>a.selectBank==1);
    localStorage.setItem("BankNames",this.crypto.Encrypt(this.selectedBank));
    console.log("SelectedGoal",this.selectedBank);
    this.route.navigate(["/mutual-fund-cart"])
    
  }

  ConfirmCart() {

    // var uniqueId;
    // if(this.validate.isNullEmptyUndefined(this.ProceedCart.uniqueId)){
    //   uniqueId = this.InvestWithoutGoal.uniqueId;
    // }
    // else{
    //   uniqueId = this.ProceedCart.uniqueId;
    // }
    // console.log("uniquid",uniqueId)

 
    
   var postData = new FormData();

    postData.append("uniqueId",this.InvestWithoutGoal.uniqueId)

    this.api.post("wealthfy/confirm-cart", postData).subscribe(resp => {
      this.ConfirmedCart = resp;
      this.route.navigate(["/mutual-payment-successful"])
    })

  }

}
