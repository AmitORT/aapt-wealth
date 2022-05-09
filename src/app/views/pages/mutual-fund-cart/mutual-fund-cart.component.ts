import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { AescryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ValidateService } from 'src/app/services/validate/validate.service';
import { ToastrService } from 'ngx-toastr';
declare var $:any;

@Component({
  selector: 'app-mutual-fund-cart',
  templateUrl: './mutual-fund-cart.component.html',
  styleUrls: ['./mutual-fund-cart.component.css']
})
export class MutualFundCartComponent implements OnInit {
  // [x: string]: any;

  SelectedButton:boolean=false;
  SelectedButton1:boolean=false;
  SelectedButton2:boolean=false;
  SelectedButton3:boolean=false;
  SelectedButton4:boolean=false;
  ShowSelectedDetails:boolean=false;
  ModeOfInvestment:any;
  ProductOverview:any;
  date:any;
  SelectedGoal:any;

  ProceedCart:any;
  ConfirmedCart:any;
  BankNames:any;

  // uniqueID:

  constructor(public route:Router, public validate:ValidateService, private crypto:AescryptoService, private api:ApiService ,  private toastr: ToastrService) { }

  
  ngOnInit(): void {


    if(localStorage.getItem("ModeOfInvestment") != null){
      this.ModeOfInvestment=this.crypto.Decrypt(localStorage.getItem("ModeOfInvestment"));
      console.log("ModeOfInvestment",this.ModeOfInvestment)
    }
    this.SelectedGoal=this.crypto.Decrypt(localStorage.getItem('GetSelectedGoals'));
    console.log('SelectedGoal', this.SelectedGoal)
   
    // let encrypted=this.crypto.Encrypt(this.ModeOfInvestment);
    // localStorage.setItem("ModeOfInvestment",encrypted);
  
    if(localStorage.getItem("ProceedCart") != null){
      this.ProceedCart=this.crypto.Decrypt(localStorage.getItem("ProceedCart"));
      console.log("GotProceedCart", this.ProceedCart)
    }
    
    // if(localStorage.getItem("ProductOverview") != null){
      this.ProductOverview=this.crypto.Decrypt(localStorage.getItem("ProductOverview"));
      console.log("ProductOverview",this.ProductOverview)
    // }
    
  }

  CompareProduct(){
    $('#compare-products-modal').modal('hide');
    this.ShowSelectedDetails=true;
  }
  
  RedirectPopup(){
    $('#compare-products-modal').modal('hide');
    this.route.navigate(['/wealth-product-listing']);
  }

  GetOnlyDay(){    
    this.ModeOfInvestment.DateForMonth=this.ModeOfInvestment.DateForMonth.slice(8);
  }

  GetBankDetails(){
    this.api.get("bankDetails/get-banks",true).subscribe(resp=>{
      if(resp.response.n==1){
        this.BankNames=resp.data;
        console.log("BankNames", this.BankNames)
      }
    })
  }

  AddCart(index:number,ID:any){
    for(let i=0;i<this.BankNames.length;i++){
    if(this.BankNames[i].id==ID){
      this.BankNames[i].SelectedButton=!this.BankNames[i].SelectedButton;
     }
  }
}

 ConfirmCart(){
   var postData = new FormData();
   
      postData.append("uniqueId",this.ProceedCart.uniqueId)
      this.api.post("wealthfy/confirm-cart", postData).subscribe(resp=>{
      this.ConfirmedCart=resp;
      this.route.navigate(["/mutual-payment-successful"])

      if(this.validate.isNullEmptyUndefined(this.ProceedCart.uniqueId)){
        this.route.navigate(["/mutual-payment-successful"]) 
      }
      // else {
      //   return false;
      // }

   })

 }
 
}
