import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $:any
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';
import { AescryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ValidateService } from 'src/app/services/validate/validate.service';

@Component({
  selector: 'app-digital-gold-product-details',
  templateUrl: './digital-gold-product-details.component.html',
  styleUrls: ['./digital-gold-product-details.component.css']
})
export class DigitalGoldProductDetailsComponent implements OnInit {
    
  PreminumTime:boolean=true;

  customOptions: OwlOptions = {
    items: 3,
		margin: 3,
		loop: true,
		stagePadding: 64,
		responsive:{
			0:{items:1,stagePadding: 30},
			480:{items:1,stagePadding: 30},
			600:{items:2,stagePadding: 30},
			1000:{items:3},
			1200:{items:3}
		},
		nav: true,
      // navText: ['Back','Next'],
      navText: ["<img src='assets/img/arrow_left.svg'>","<img src='assets/img/arrow_right.svg'>"],
      dots: false,
      dotsEach: true,
      lazyLoad: false,
      autoplay: true,
      autoplaySpeed: 500,
      navSpeed: 500,
      autoplayTimeout: 5000,
      autoplayHoverPause: true
  }

  value12:any = 7; 
  options12: Options = {
    floor: 3700,
    ceil: 5300,
    hidePointerLabels:true,
    translate: (value12: number, label: any): string => {  
      switch (label) {  
          case label.Low:  
              return "<b>Rs. 3,700</b> Rs." + value12; 
          case label.High:  
              return "<b>Rs. 5,300</b> Rs." + value12;  
          default:  
              return "Rs.&nbsp;" + value12 + "&nbsp;" ;  
      }  
    }     
  };

  monthly_amt:any = 500; 
  monthly_amt1: Options = {
    floor: 500,
    ceil: 100000,
    hidePointerLabels:true,
    translate: (monthly_amt: number, label: any): string => {  
      switch (label) {  
          case label.Low:  
              return "<b>₹ 3,700</b> ₹" + monthly_amt; 
          case label.High:  
              return "<b>₹ 5,300</b> ₹" + monthly_amt;  
          default:  
              return "₹ &nbsp;" + monthly_amt + "&nbsp;" ;  
      }  
    }     
  };
  
  yearly_amt:any = 500; 
  yearly_amt1: Options = {
    floor: 500,
    ceil: 100000,
    hidePointerLabels:true,
    translate: (yearly_amt: number, label: any): string => {  
      switch (label) {  
          case label.Low:  
              return "<b>₹ 3,700</b> ₹" + yearly_amt; 
          case label.High:  
              return "<b>₹ 5,300</b> ₹" + yearly_amt;  
          default:  
              return "₹ &nbsp;" + yearly_amt + "&nbsp;" ;  
      }  
    }     
  };

  SimilarProducts:any;
  ProductManager:any;
  ProductOverview:any;
  Productreturn:any;
  ProductSectorDetails:any;
  holdings:any;
  select_amt:any;
  SetModeOfInvestment:any;
  otp1:string="";
  otp2:string="";
  otp3:string="";
  otp4:string="";
  otp5:string="";
  otp6:string="";
 
  ModeOfInvestment:any={
    "Payment_mode":"",
    "DateForMonth":"",
    "monthly_amt":"",
    "yearly_amt":""
  }

  constructor(public route:Router, public validate:ValidateService, private toastr: ToastrService , private crypto:AescryptoService, private api:ApiService) { }

  ngOnInit(): void {
  }

  keytab(nextTabId:number,event:any) {
    let actionFlag=false;
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode<96 || charCode>105)) {

    }
    else if(charCode == 8){
      nextTabId--;
      if(nextTabId < 1){
      nextTabId = 1;
      }
    actionFlag=true;
    }
    else{ 
      if(nextTabId > 6){
         nextTabId = 6; 
        } 
        actionFlag=true; 
      }
    if(actionFlag){
       const field = document.getElementById("otp" + nextTabId);
    if (field) {
      field.focus();
      field.click();
    } 
  } 
}



  Navigate(){
    this.route.navigateByUrl("/digital-gold-purchased-successful"); 
    $('.modal-backdrop').remove();
  }
}
