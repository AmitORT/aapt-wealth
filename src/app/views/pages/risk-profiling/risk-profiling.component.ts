import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { ValidateService } from 'src/app/services/Validate/validate.service';
import { AescryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ApiService } from 'src/app/services/api/api.service';
import { ToastrService } from 'ngx-toastr';
declare var $:any;

@Component({
  selector: 'app-risk-profiling',
  templateUrl: './risk-profiling.component.html',
  styleUrls: ['./risk-profiling.component.css'],
  animations: [
    trigger('fadeinout', [
      state('hide', style({ 'height': '0%', 'opacity': '0', 'display': 'none' })),
      state('visible', style({ 'height': 'auto', 'opacity': '1' })),
      transition('hide => visible', [
        style({ 'display': 'block' }), animate('1000ms ease-in')
      ]),
      transition('visible => hide', [animate('10ms ease-out')])
    ])
  ]
})
export class RiskProfilingComponent implements OnInit {

  Currentstep:number=1;
  RiskProfiling:boolean=true;
  Disease:boolean=false;
  CheckEligibility:boolean=false;
  Percentage:any;
  ShowEligibility:boolean=false;
  Steps: number= 1;
  StepsWidth: number= 0;
  Pincode:any;
  selectedItem1:any
  selectedItem:any;
  PortfolioValue:any;
  portfolio:any;
  investment:any;
  InvestingPurpose:any;
  investor:any;
  compensation:any;
  retire:any;
  selectedItem2:any;

  RiskProfilingData:any={
    "First_Name":"",
    "Last_Name":"",
    "Date_of_Birth":"",
    "Que1":"",
    "Que2":"",
    "Que3":"",
    "Que4":"",
    "Que5":"",
    "Que6":"",
    "Que7":"",
    "Que8":"",
    "Que9":"",
    "Que10":""
  }

  value21:any = 200000; 
  options21: Options = {
    floor: 0,
    ceil: 500000,
    translate: (value21: number, label: any): string => {  
              switch (label) {  
                  case label.Low:  
                      return "<b>Min 1 Lakh</b> ₹" + value21; 
                  case label.High:  
                      return "<b>Max 5 Lakh</b> ₹" + value21;  
                  default:  
                      return "₹" + value21;  
              }  
    }  
    
  };

  constructor(public route:Router, private toastr: ToastrService, public validate:ValidateService, private crypto:AescryptoService, private api:ApiService) { }


  GetQuestionsData:any;
  RiskProfilingSubmitData:any=[];

  ngOnInit(): void {



    $("#riskModal1").modal("show");
    this.GetQuestions();

  }

  GetQuestions(){ 
    let data=new FormData();
      data.append("include",'[{"relation":"possibleAnswers"}]');
      data.append("isActive",'1');

    this.api.post("wealthfy/get-risk-profile-questions",data).subscribe((resp)=>{
      // console.log(resp);
      if(resp.response.n==1){
        this.GetQuestionsData = resp.data;
        // console.log("GetQuestionsData",this.GetQuestionsData);
        this.GetQuestionsData?.forEach((element: any) => {
          element.GivenAnswer=""; 
        });

        let Idstep=1;
        this.GetQuestionsData?.forEach((element: any) => {
          element.Idstep=Idstep; 
          Idstep++;
        });
      }
    })
  }

  showSecondModal(){
    $("#riskModal1").modal("hide");
    $("#riskModal2").modal("show");
  }

  hidemodal(){
    $("#riskModal1").modal("hide");
    $("#riskModal2").modal("hide");
  }

  ProceedTonextStep(){
    if(this.validate.isNullEmptyUndefined(this.RiskProfilingData.First_Name)){
      this.toastr.error('First name is mandatory');
    }
    else if (this.validate.isNullEmptyUndefined(this.RiskProfilingData.Last_Name)){
      this.toastr.error('Last name is mandatory');
    }
    else if (this.validate.isNullEmptyUndefined(this.RiskProfilingData.Date_of_Birth)){
      this.toastr.error('Date of birth is mandatory');
    }
    else{
      this.RiskProfiling=false;
    }
  }
 
  NextStep() {
   
    let validationFlag=true;
    this.GetQuestionsData.forEach((element: any) => {      
      if(element.Idstep==this.Steps && this.validate.isNullEmptyUndefined(element.GivenAnswer)){
        $("#error"+element.Idstep).removeClass("error");
        validationFlag=false;
      }else{
        if(!$("#error"+element.Idstep).hasClass("error")){
          $("#error"+element.Idstep).addClass("error")
        }
      }
      if(this.GetQuestionsData.length==this.Steps && !this.validate.isNullEmptyUndefined(element.GivenAnswer) && element.Idstep==this.Steps){
        this.GotoCongratulations();
      }
    });
    if(validationFlag){
      this.ShowEligibility=false;
      for(let i=this.Steps+1;i<=9;i++){
        $("#step"+i).removeClass("active");
      }
      this.Steps++;    
      this.StepsWidth=this.StepsWidth+8.4;   
  
      this.Percentage
      var $parentDiv=  $('.process-div');
      var $innerListItem=$("#step"+this.Steps);
      $innerListItem.addClass("active");
      // $("#step"+this.Steps).addClass("active");
      // $("#step"+this.Steps).animate({ scrollTop: $('.process-div').offset()-100 }, 1000);
      // $parentDiv.animate({ scrollTop: ($innerListItem.position().top - 50) }, 1000);

      $parentDiv.animate({ scrollTop: ($parentDiv.scrollTop() + $innerListItem.position().top - $parentDiv.height()/2 + $innerListItem.height()/2) }, 1000);

      //.scrollTop($parentDiv.scrollTop() + $innerListItem.position().top - $parentDiv.height()/2 + $innerListItem.height()/2);
      // $('.process-div').animate({ scrollTop: $('.process-div')[0].scrollHeight }, 1000);//.scrollTop();
      if(this.StepsWidth>100)    
      {    
      this.StepsWidth=100;    
      } 
    }
    
  }

  GotoCongratulations(){
    this.RiskProfilingSubmitData=[];
    this.GetQuestionsData.forEach((element: any) => {
     var tempsubmitdata={
        "riskProfileQuestionId":element.id,        
        "riskProfileAnswerId":element.GivenAnswer,        
        "isAnswered":true        
        }; 
        this.RiskProfilingSubmitData.push(tempsubmitdata);       
    });  

    var postData=new FormData();
      postData.append("answers",JSON.stringify(this.RiskProfilingSubmitData));
      postData.append("riskProfileType",this.GetQuestionsData[0].type);
      postData.append("recalculateRiskProfile",'1');
    
    this.api.post("wealthfy/submit-risk-profile-questions",postData).subscribe((resp)=>{
      if(resp.response.n==1){    
        let encrypted=this.crypto.Encrypt(resp.data);
        localStorage.setItem("RiskProfilesubmitResponse",encrypted);

        this.route.navigate(["/congratulations"]);
      }else{
        alert(resp.response.Msg)
      }
    });    
  }

  ShowDisease(){
    this.Disease = true;
    if(this.Disease == true){
      this.CheckEligibility = false;
    }
  }

  ShowCheckEligibility(){
    this.CheckEligibility = true;
    if(this.CheckEligibility == true){
      this.Disease = false;
      this.selectedItem='';
    }
  }

  
}
