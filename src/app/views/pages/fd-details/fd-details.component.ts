import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';
import { AescryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ValidateService } from 'src/app/services/Validate/validate.service';
declare var $:any;

@Component({
  selector: 'app-fd-details',
  templateUrl: './fd-details.component.html',
  styleUrls: ['./fd-details.component.css']
})
export class FdDetailsComponent implements OnInit {

  customOptions: OwlOptions = {
    items: 3,
		margin: 3,
		loop: true,
		// stagePadding: 64,
		responsive:{
			0:{items:1,stagePadding: 30},
			480:{items:1,stagePadding: 30},
			600:{items:2,stagePadding: 30},
			1000:{items:3},
			1200:{items:3}
		},
		nav: true,
    navText: ["<img src='assets/img/arrow_left.svg'>","<img src='assets/img/arrow_right.svg'>"],
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



  constructor(public route:Router, public validate:ValidateService, private toastr: ToastrService , private crypto:AescryptoService, private api:ApiService) { }

  monthly_amt:any = 25000; 
  monthly_amt1: Options = {
    floor: 25000,
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

  yearly_amt:any = 1; 
  yearly_amt1: Options = {
    floor: 1,
    ceil: 5,
    hidePointerLabels:true,
    translate: (yearly_amt: number, label: any): string => {  
      switch (label) {  
          case label.Low:  
              return "<b>₹ 3,700</b> ₹" + yearly_amt; 
          case label.High:  
              return "<b>₹ 5,300</b> ₹" + yearly_amt;  
          default:  
              return yearly_amt +"&nbsp;" + "years" ;  
      }  
    }     
  };

  ngOnInit(): void {
  }

  GetEligibility(){
    $("#invest-screen").modal("hide");
    this.route.navigate(["/FD-eligible"]);
   
  }
}
