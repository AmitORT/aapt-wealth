import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-account-portfolio-product-details',
  templateUrl: './account-portfolio-product-details.component.html',
  styleUrls: ['./account-portfolio-product-details.component.css']
})
export class AccountPortfolioProductDetailsComponent implements OnInit {


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

  PreminumTime:boolean=true;

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

  value13:any = 500; 
  options13: Options = {
    floor: 500,
    ceil: 100000,
    hidePointerLabels:true,
    translate: (value13: number, label: any): string => {  
      switch (label) {  
          case label.Low:  
              return "<b>₹ 3,700</b> ₹" + value13; 
          case label.High:  
              return "<b>₹ 5,300</b> ₹" + value13;  
          default:  
              return "₹ &nbsp;" + value13 + "&nbsp;" ;  
      }  
    }     
  };
  value14:any = 500; 
  options14: Options = {
    floor: 0,
    ceil: 100000,
    hidePointerLabels:true,
    translate: (value14: number, label: any): string => {  
      switch (label) {  
          case label.Low:  
              return "<b>₹ 3,700</b> ₹" + value14; 
          case label.High:  
              return "<b>₹ 5,300</b> ₹" + value14;  
          default:  
              return "₹ &nbsp;" + value14 + "&nbsp;" ;  
      }  
    }     
  };
  constructor() { }

  ngOnInit(): void {
  }

}
