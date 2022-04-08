import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-account-goal-planning',
  templateUrl: './account-goal-planning.component.html',
  styleUrls: ['./account-goal-planning.component.css']
})
export class AccountGoalPlanningComponent implements OnInit {

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


  constructor() { }

  ngOnInit(): void {
  }

}
