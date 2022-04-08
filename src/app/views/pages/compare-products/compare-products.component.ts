import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { AescryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ValidateService } from 'src/app/services/Validate/validate.service';
declare var $:any;

@Component({
  selector: 'app-compare-products',
  templateUrl: './compare-products.component.html',
  styleUrls: ['./compare-products.component.css']
})
export class CompareProductsComponent implements OnInit {

  ShowCompare:boolean=false;
  ShowSelectedDetails:boolean=false;
  MutualProductCompareFund:any;
  OffersForCompare:any=[];
  PreminumTime:boolean=false;
  PreminumTime2:boolean=false;
  PreminumTime1:boolean=false;

  constructor(private crypto:AescryptoService,public validate:ValidateService,private api:ApiService,private route:Router) { }

  ngOnInit(): void {

    this.MutualProductCompareFund=this.crypto.Decrypt(localStorage.getItem("MutualProductCompareFund"));
    console.log("MutualProductCompareFund",this.MutualProductCompareFund)
    this.OffersForCompare=this.MutualProductCompareFund.filter((a:any)=>a.checkforcompare==1);
    console.log("OffersForCompare",this.OffersForCompare)
    
  }

  compareCheckboxclick(index:number,ID:any){
    
  for(let i=0;i<this.MutualProductCompareFund.length;i++){
    if(this.MutualProductCompareFund[i].id==ID){
        this.MutualProductCompareFund[i].checkforcompare=!this.MutualProductCompareFund[i].checkforcompare;
       }
  }
  if(this.MutualProductCompareFund.filter((a:any)=>a.checkforcompare==1).length>4){
    this.MutualProductCompareFund[index].checkforcompare=0;
    alert("You can add max 4 offer for compare");
  }else{
     this.OffersForCompare=this.MutualProductCompareFund.filter((a:any)=>a.checkforcompare==1);
     localStorage.setItem("MutualProductCompareFund",this.crypto.Encrypt(this.MutualProductCompareFund));
     console.log("compareoffer",this.OffersForCompare);
   }
  }


}
