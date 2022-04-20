import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { OwlOptions } from 'ngx-owl-carousel-o';
declare var $: any;

@Component({
  selector: 'app-bond-product-details',
  templateUrl: './bond-product-details.component.html',
  styleUrls: ['./bond-product-details.component.css']
})
export class BondProductDetailsComponent implements OnInit {

  tax:any;

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
		nav: false,
      // navText: ['Back','Next'],
      dots: false,
      dotsEach: true,
      lazyLoad: false,
      autoplay: false,
      autoplaySpeed: 500,
      navSpeed: 500,
      autoplayTimeout: 5000,
      autoplayHoverPause: true
  }

  constructor() { }

  ModeOfInvestment:any={
    "Payment_mode":"",
    "DateForMonth":"",
    "monthly_amt":"",
    "monthly_amt1":"",
  }
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

  ngOnInit(): void {

    
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
      if ($('#sidebar').offset().top + $("#sidebar").height() > $("#footer").offset().top-225) {
      $('#sidebar').css('top',-($("#sidebar").offset().top + $("#sidebar").height() - $("#footer").offset().top+225));
      }
      });
  }

}
