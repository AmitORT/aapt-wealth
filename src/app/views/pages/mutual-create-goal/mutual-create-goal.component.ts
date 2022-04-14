import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { AescryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ValidateService } from 'src/app/services/Validate/validate.service';
import { ToastrService } from 'ngx-toastr';

declare var $:any;


@Component({
  selector: 'app-mutual-create-goal',
  templateUrl: './mutual-create-goal.component.html',
  styleUrls: ['./mutual-create-goal.component.css']
})
export class MutualCreateGoalComponent implements OnInit {

  RupeeChange:boolean=false;
  dateFormat:any;
 
  CreateGoal?:any={
    "ImageOfGoal":"",
    "Savings":"",
    "Payment_Mode":"",
    "Goal_Amount":"",
    "Goal_Duartion":"",
    "Date_For_Installments":"",
    "Return_Rate":"0",
    "Inflation_Rate":"0",
    "Saving_Amount":""
  }

  Goals:any;
  CreateGoalList: any = []

  DateOfInstallment:any;
  
  constructor(public route:Router,private toastr: ToastrService, public validate:ValidateService, private crypto:AescryptoService, private api:ApiService) { }

  ngOnInit(): void {
    
    if(localStorage.getItem("MyGoals") != null){
      this.CreateGoalList=this.crypto.Decrypt(localStorage.getItem("MyGoals"));
      console.log("Goals", this.CreateGoalList);      
    }
  } 

  getDateofInstallment(){   
    // const d = new Date();
    // let day = d.getDate();
  }
  
  uploadFile($event:any) {
    var Image:any;
    var reader = new FileReader();
    reader.readAsDataURL($event.target.files[0]);
     Image=$event.target.files[0];
    reader.onload = function () {
    var ThumbnailBase64 = reader.result;
    console.log("thumbnail ",ThumbnailBase64);
    $("#profileimg").attr("src",ThumbnailBase64);
    // Image=ThumbnailBase64;
    }
    console.log($event.target.files[0]); // outputs the first file
    console.log("Image",Image)
    }

  options12: Options = {
    floor: 0,
    ceil: 20,
    hidePointerLabels:true,
    translate: (value12: number, label: any): string => {  
      switch (label) {  
          case label.Low:  
              return "<b>0% Min</b> ₹" + value12; 
          case label.High:  
              return "<b>20% Max</b> ₹" + value12;  
          default:  
              return value12 + "%" ;  
      }  
    }     
  };

  options13: Options = {
    floor: 0,
    ceil: 20,
    hidePointerLabels:true,
    translate: (value12: number, label: any): string => {  
      switch (label) {  
          case label.Low:  
              return "<b>0% Min</b> ₹" + value12; 
          case label.High:  
              return "<b>20% Max</b> ₹" + value12;  
          default:  
              return value12 + "%" ;  
      }  
    }     
  };
  // highvalue:any=1000;

  CreateGoalAndInvest(){

    if(this.validate.isNullEmptyUndefined(this.CreateGoal.Savings)){
      this.toastr.error('Reason for saving is mandatory');
    }
    else if(this.validate.isNullEmptyUndefined(this.CreateGoal.Payment_Mode)){
      this.toastr.error('Payment Mode is mandatory');
    }
    else if(this.validate.isNullEmptyUndefined(this.CreateGoal.Goal_Amount)){
      this.toastr.error('Goal Amount is mandatory');
    }
    else if(this.validate.isNullEmptyUndefined(this.CreateGoal.Goal_Duartion)){
      this.toastr.error('Goal Duration is mandatory');
    }
    else if(this.validate.isNullEmptyUndefined(this.CreateGoal.Date_For_Installments)){
      this.toastr.error('Date of Month is mandatory');
    }
    else if(this.CreateGoal.Return_Rate==0){
      this.toastr.error('Rate of Return is mandatory');
    }
    else if(this.CreateGoal.Inflation_Rate==0){
      this.toastr.error('Rate of Inflation is mandatory');
    }
    else {

      this.CreateGoalList.push(this.CreateGoal);
  
      let encrypted=this.crypto.Encrypt(this.CreateGoalList);
      localStorage.setItem("MyGoals",encrypted);

      this.route.navigate(['/mutual-fund-cart']);
      
    }
  }

  GetOnlyDay(){    
    this.CreateGoal.Date_For_Installments=this.CreateGoal.Date_For_Installments.slice(8);
  }




}
