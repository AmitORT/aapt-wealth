import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/services/api/api.service';
import { AescryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ValidateService } from 'src/app/services/validate/validate.service';

@Component({
  selector: 'app-mutual-select-goal',
  templateUrl: './mutual-select-goal.component.html',
  styleUrls: ['./mutual-select-goal.component.css']
})
export class MutualSelectGoalComponent implements OnInit {

  customOptions: OwlOptions = {
    items: 3,
		margin: 3,
		loop:true,
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

  CreateGoalResponse:any;
  CreateGoalList:any;

  constructor(public route:Router, public validate:ValidateService, private crypto:AescryptoService, private api:ApiService) { }

  ngOnInit(): void {

  this.CreateGoalResponse=this.crypto.Decrypt(localStorage.getItem("MyGoals"));
  console.log("CreateGoalList",this.CreateGoalResponse)
  }



}
