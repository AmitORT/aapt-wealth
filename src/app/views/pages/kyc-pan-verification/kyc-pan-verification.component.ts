import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-kyc-pan-verification',
  templateUrl: './kyc-pan-verification.component.html',
  styleUrls: ['./kyc-pan-verification.component.css']
})
export class KycPanVerificationComponent implements OnInit {

  HeadingText:string="Pan Verification";
  StepsWidth: number= 0;
  step:number=1;
  PanDetails:boolean=false;
  StepBtn1:boolean=true;
  PhtoVerify:boolean=false;
  BackPhotoVerify:boolean=false;
  StepBtn:boolean=false;
  BackPhoto:boolean=true;
  AdharVerificationComplete:boolean=false;
  gendervalue:any;
  gendervalue1:any;
  MaritalStatus:any;
  Nationality:any;
  selectedItem1:any;
  BankDetails:boolean=false;
  Personal:boolean=false;
  video:boolean=false;
  Arrow:boolean=false;
  selectedItem:any;
  Signature:boolean=false;
  Identity:boolean=false;
  photo:boolean=false;
  photo1:boolean=true;
  VideoSuccess:boolean=false;
  Capture:boolean=true;
  Esign:boolean=false;
  TransactionSuccess:boolean=false;
  Congrats:boolean=false;
  BankModall:boolean=true
 
 
  constructor(private router:Router) { }

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

  scrolltotop(){
    $('.body-color').animate({
      scrollTop: 0
  }, 0);
  }

  showvideodiv(){
    setTimeout(()=>{
      this.step=9;
    },3000)
  }

  BankModal(){
    if(this.step==3 && this.BankDetails==true){
      $("#bank-modal").modal('show');
      setTimeout("$('#bank-modal').modal('hide');",3000);
      setTimeout(()=>{
        this.HeadingText='Personal Details';   
        this.step=4; 
      },3001);
    } 
  }

  BackRouting(){
  this.step--;
  if(this.step==9){
    this.HeadingText='Video Verification';
  }
  if(this.step==8){
    this.HeadingText='video recording';
  }
  else if(this.step==7){
    this.HeadingText='Photo';
  }
  else if(this.step==6){
    this.HeadingText='Signature';
  }
  else if(this.step==5){
    this.HeadingText='Personal Details';
  }
  else if(this.step==4){
    this.HeadingText='Personal Details';
  }
  else if(this.step==3){
    this.HeadingText='Bank Verification';
  }
  else if(this.step==2){
    this.HeadingText='Aadhar Verification';
  }
  else if(this.step==1){
    this.HeadingText='Pan Verification';
  }
  else if(this.step==0){
    this.router.navigate(['/account-kyc-verfication']);
  }
}
}
