import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';
import { AescryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ValidateService } from 'src/app/services/Validate/validate.service';
declare var $ : any;

@Component({
  selector: 'app-redeem-funds',
  templateUrl: './redeem-funds.component.html',
  styleUrls: ['./redeem-funds.component.css']
})
export class RedeemFundsComponent implements OnInit {

  DisplayAccordion:boolean=false;
  Steps:number= 1;
  fund:any;
  
  constructor(public route:Router, private toastr: ToastrService, public validate:ValidateService, private crypto:AescryptoService, private api:ApiService) { }

  ngOnInit(): void {
    $(".body-color").scroll(function () {
      if($(".body-color").scrollTop() > 150) {
      $('#sidebar').css('position','fixed');
      $('#sidebar').css('top','5%');
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
  }

  NextStep(){
    this.Steps++; 
  }

  scrolltotop(){
    $('.body-color').animate({
      scrollTop: 0
  }, 0);
  }
  
  ShowAccordion(){
    this.DisplayAccordion=true; 
      $("#collapseOne").collapse('hide');
      $("#collapseTwo").collapse('show');
  }

  RedeemNow(){
    if(this.validate.isNullEmptyUndefined(this.fund)){
      this.toastr.error()
    }
    else if(this.validate.isNullEmptyUndefined(this.fund)){
      this.toastr.error()
    }
    else{
      this.route.navigate(["/order-placed"]);
    }
    
  }




}
