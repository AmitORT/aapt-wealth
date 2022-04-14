import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { AescryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ValidateService } from 'src/app/services/Validate/validate.service';
declare var $:any;

@Component({
  selector: 'app-mutual-fund-cart',
  templateUrl: './mutual-fund-cart.component.html',
  styleUrls: ['./mutual-fund-cart.component.css']
})
export class MutualFundCartComponent implements OnInit {

  SelectedButton:boolean=false;
  SelectedButton1:boolean=false;
  SelectedButton2:boolean=false;
  SelectedButton3:boolean=false;
  SelectedButton4:boolean=false;
  ShowSelectedDetails:boolean=false;
  ModeOfInvestment:any;
  ProductOverview:any;
  date:any;

  constructor(public route:Router, public validate:ValidateService, private crypto:AescryptoService, private api:ApiService) { }

  
  ngOnInit(): void {
    this.ModeOfInvestment=this.crypto.Decrypt(localStorage.getItem("ModeOfInvestment"));
    console.log("ModeOfInvestment",this.ModeOfInvestment)

    let encrypted=this.crypto.Encrypt(this.ModeOfInvestment);
    localStorage.setItem("ModeOfInvestment",encrypted);

    // let encrypted=this.crypto.Encrypt(this.ModeOfInvestment);
    // localStorage.setItem("SetModeOfInvestment",encrypted);
    // console.log("SetModeOfInvestment",this.ModeOfInvestment)

    this.ProductOverview=this.crypto.Decrypt(localStorage.getItem("ProductOverview"));
    console.log("ProductOverview",this.ProductOverview)
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

}
