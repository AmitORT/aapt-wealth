import { Options } from '@angular-slider/ngx-slider';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {

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


  constructor(private router:Router) { }

  ngOnInit(): void {
  }

 

}
