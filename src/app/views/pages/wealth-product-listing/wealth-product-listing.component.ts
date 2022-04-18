
import { Options } from '@angular-slider/ngx-slider';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidateService } from 'src/app/services/validate/validate.service';
import { AescryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ApiService } from 'src/app/services/api/api.service';
import { ToastrService } from 'ngx-toastr';
declare var $:any;

@Component({
  selector: 'app-product-listing',
  templateUrl: './wealth-product-listing.component.html',
  styleUrls: ['./wealth-product-listing.component.css']
})
export class WealthProductListingComponent implements OnInit {

  customOptions: OwlOptions = {
    items: 5,
		margin: 3,
		loop: false,
		responsive:{
			0:{items:5},
			480:{items:5},
			600:{items:5},
			1000:{items:5},
			1200:{items:5}
		},
		nav: false,
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

  customOptions1: OwlOptions = {
    items: 2,
		margin: 3,
		loop: false,
		nav: false,
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
  customOptions2: OwlOptions = {
    items: 2,
		margin: 3,
		loop: false,
		nav: false,
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

  value11:any = 5; 
  options11: Options = {
    floor: 0,
    ceil: 10,
    hideLimitLabels: true,
    translate: (value11: number, label: any): string => {  
      switch (label) {  
          // case label.Low:  
          //     return "<b>Min 1 Lakh</b> ₹" + value11; 
          // case label.High:  
          //     return "<b>Max 5 Lakh</b> ₹" + value11;  
          default:  
              return "₹" + value11 + " Lakh";  
      }  
    }     
  };

  value12:any = 2; 
  options12: Options = {
    floor: 1,
    ceil: 5,
    hidePointerLabels:true,
    translate: (value12: number, label: any): string => {  
      switch (label) {  
          case label.Low:  
              return "<b>Min 1 Year</b> ₹" + value12; 
          case label.High:  
              return "<b>Max 5 Year</b> ₹" + value12;  
          default:  
              return value12 + "&nbsp;year" ;  
      }  
    }     
  };

  value13:any = 1000; 
  options13: Options = {
    floor: 500,
    ceil: 2000,
    translate: (value13: number, label: any): string => {  
      switch (label) {  
          case label.Low:  
              return "<b>Min 1 </b> ₹" + value13; 
          case label.High:  
              return "<b>Max 5 </b> ₹" + value13;  
              // return "&nbsp;";
          default:  
              return "₹" + value13;  
      }  
    }     
  };


  PreminumTime:boolean=true;
  OtherOffers:boolean=false;
  Comapare1:any=0;
  Comapare2:any=0;
  Comapare3:any=0;
  Comapare4:any=0;
  Comapare5:any=0;
  Comapare6:any=0;


  ProductOfferForBinding:any;
  ProductOffer:any;
  OffersForCompare:any=[];
  MutualProductCompareFund:any;



  constructor(public route:Router,private toastr: ToastrService, public validate:ValidateService, private crypto:AescryptoService, private api:ApiService) { }

  ngOnInit(): void {
    $(".body-color").scroll(function () {
      if($(".body-color").scrollTop() > 150) {
      $('#sidebar').css('position','fixed');
      $('#sidebar').css('top','10%');
      $('#sidebar').css('width',$("#sidebar-main").width()+'px');
      }
      else if ($(".body-color").scrollTop() <= 150) {
      $('#sidebar').css('position','');
      $('#sidebar').css('top','');
      $('#sidebar').css('width','');
      }    

      if ($('#sidebar').offset().top + $("#sidebar").height() > $("#footer").offset().top-100) {
      $('#sidebar').css('top',-($("#sidebar").offset().top + $("#sidebar").height() - $("#footer").offset().top+100));
      }

      });

    this.GetOffers();
  }

  GetOffers(){
  var postData=new FormData();
  postData.append("instrumentId","191393");
  postData.append("limit","10");
  postData.append("offset","0");
  
  this.api.post("wealthfy/top-rated-amc",postData).subscribe((resp: any)=>{
    console.log("resp",resp)
    if(resp.response.n==1){      
      this.ProductOfferForBinding = resp.data;


    }else{
      alert(resp.response.Msg)
    }
  });
 }

compareCheckboxclick(index:number){
  this.ProductOfferForBinding[index].checkforcompare=!this.ProductOfferForBinding[index].checkforcompare;
  
 if(this.ProductOfferForBinding.filter((a:any)=>a.checkforcompare==1).length>4){
   this.ProductOfferForBinding[index].checkforcompare=0;
  alert("You can add max 4 offer for compare");
 }else{
   this.OffersForCompare=this.ProductOfferForBinding.filter((a:any)=>a.checkforcompare==1);
   localStorage.setItem("MutualProductCompareFund",this.crypto.Encrypt(this.ProductOfferForBinding));
   console.log("compareoffer",this.OffersForCompare);
 }
}

RemoveFromCompare(model:any,i:any){
  console.log("model",model)
  this.OffersForCompare.splice(i,1);    
  
  this.ProductOfferForBinding.forEach((element: any) => {
    if(element.id==model.id){
      element.checkforcompare=0;  
    }
  });
}

cancelcompare(){
  this.ProductOfferForBinding.forEach(function(item:any){
      item.checkforcompare=0;
  });
  this.OffersForCompare=[];
}

SelectFund(){
  this.toastr.warning('Select a product from above list');
}
}
