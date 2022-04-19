import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-bond-eligibility',
  templateUrl: './bond-eligibility.component.html',
  styleUrls: ['./bond-eligibility.component.css']
})
export class BondEligibilityComponent implements OnInit {

  otp1:string="";
  otp2:string="";
  otp3:string="";
  otp4:string="";
  otp5:string="";
  otp6:string="";

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  keytab(nextTabId:number,event:any) {
    let actionFlag=false;
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode<96 || charCode>105)) {

    }
    else if(charCode == 8){
      nextTabId--;
      if(nextTabId < 1){
      nextTabId = 1;
      }
    actionFlag=true;
    }
    else{ 
      if(nextTabId > 6){
         nextTabId = 6; 
        } 
        actionFlag=true; 
      }
    if(actionFlag){
       const field = document.getElementById("otp" + nextTabId);
    if (field) {
      field.focus();
      field.click();
    } 
  } 
}

Navigate(){
  $(".modal-backdrop").remove();
  this.router.navigateByUrl("/FD-successful"); 
  
}

}
