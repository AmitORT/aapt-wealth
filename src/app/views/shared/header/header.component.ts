import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(".login-popup").on('click',function(e:any){
			e.stopPropagation();
		});
    $(".open-signup").click(function(){
			$(".sign-up").show();
			$(".sign-in").hide();
			
		});
		$(".open-sigin").click(function(){
			$(".sign-in").show();
			$(".sign-up").hide();
		});
  }
  handleOpenCloseNav(){
    if (document.getElementById("site-wrapper-menu")!.classList.contains("show-nav")) {
      document.getElementById("site-wrapper-menu")!.classList.remove("show-nav");
    }else{
      document.getElementById("site-wrapper-menu")!.classList.add("show-nav");
    }
  }
}
