import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';
import { ValidateService } from 'src/app/services/validate/validate.service';
import { ApiService } from 'src/app/services/api/api.service';
import { AescryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ToastrService } from 'ngx-toastr';
declare var $ : any;

@Component({
  selector: 'app-wealth-product-details',
  templateUrl: './wealth-product-details.component.html',
  styleUrls: ['./wealth-product-details.component.css']
})
export class WealthProductDetailsComponent implements OnInit {
  flag:boolean=false;
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
  ShowCarousel:any;

 
  ModeOfInvestment:any={
    "Payment_mode":"1",
    "DateForMonth":"15",
    "monthly_amt":"",
    "yearly_amt":""
  }
 

  constructor(public route:Router, public validate:ValidateService, private toastr: ToastrService , private crypto:AescryptoService, private api:ApiService) { }

  ngOnInit(): void {

    this.GetProductDetail();

    this.ModeOfInvestment=this.crypto.Decrypt(localStorage.getItem("ModeOfInvestment"));
    console.log("ModeOfInvestment",this.ModeOfInvestment)
    
  
    $(".body-color").scroll(function () {
      if($(".body-color").scrollTop() > 150) {
      $('#sidebar').css('position','fixed');
      $('#sidebar').css('top','13%');
      $('#sidebar').css('width',$("#sidebar-main").width()+'px');

      }
      else if ($(".body-color").scrollTop() <= 150) {
      $('#sidebar').css('position','');
      $('#sidebar').css('top','');
      $('#sidebar').css('width','');
      }
      if ($('#sidebar').offset()?.top + $("#sidebar").height() > $("#footer").offset()?.top-225) {
      $('#sidebar').css('top',-($("#sidebar").offset()?.top + $("#sidebar").height() - $("#footer").offset()?.top+225));
      }
      });

    
    
  }

  // scrolltotop(){
  //   $('.body-color').animate({
  //     scrollTop: 0
  // }, 0);
  // }

  GetOnlyDay(){    
    this.ModeOfInvestment.DateForMonth=this.ModeOfInvestment.DateForMonth.slice(8);
   }

  CreateSip(){
   
    if(this.validate.isNullEmptyUndefined(this.ModeOfInvestment.Payment_mode)){
      this.toastr.error('Payment Mode is mandatory');
    }
    else if(this.ModeOfInvestment.Payment_mode == 1 && this.validate.isNullEmptyUndefined(this.ModeOfInvestment.DateForMonth)){
      this.toastr.error('Date is mandatory');
    }
    else{
      $("#invest-screen").modal("hide");
      let encrypted=this.crypto.Encrypt(this.ModeOfInvestment);
      localStorage.setItem("ModeOfInvestment",encrypted);
  
      this.route.navigate(['/mutual-select-goal']);

      $('.body-color').animate({
        scrollTop: 0
    }, 0);
    } 
  }

  GetProductDetail(){
    
    var orderby=[{"name": "weight", "sort": "DESC"}];

    var postData=new FormData();

    postData.append("instrumentId","191394");
    postData.append("limit","10");
    postData.append("offset","0");
    postData.append("holdinglimit","10");
    postData.append("orderBy",JSON.stringify(orderby));
    postData.append("whereClause","{}");

    this.api.post("wealthfy/get-product-overview",postData).subscribe((resp: any)=>{
    
      console.log("resp",resp)
      if(resp.response.n==1){
        this.ProductManager=resp.data.productManager;
        this.ProductOverview=resp.data.productOverview;
        this.Productreturn=resp.data.productReturn;
        this.ProductSectorDetails=resp.data.productSectorDetails;
        this.SimilarProducts=resp.data.similarProducts;  
        this.holdings=resp.data.fetchHoldings.instrumentHoldings;   
        
        let encrypted=this.crypto.Encrypt(this.ProductOverview);
        localStorage.setItem("ProductOverview",encrypted);
        // console.log(this.ProductSectorDetails)
      }else{
        alert(resp.response.Msg)
      }
    });
  }

  

}
