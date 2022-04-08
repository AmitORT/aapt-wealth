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

  constructor(public route:Router, public validate:ValidateService, private crypto:AescryptoService, private api:ApiService) { }

  ngOnInit(): void {
    this.ModeOfInvestment=this.crypto.Decrypt(localStorage.getItem("ModeOfInvestment"));
    console.log("ModeOfInvestment",this.ModeOfInvestment)
  }

  CompareProduct(){
    $('#compare-products-modal').modal('hide');
    this.ShowSelectedDetails=true;
  }

  RedirectPopup(){
    $('#compare-products-modal').modal('hide');
    this.route.navigate(['/wealth-product-listing']);
  }

}
