import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-fd-open',
  templateUrl: './fd-open.component.html',
  styleUrls: ['./fd-open.component.css']
})
export class FdOpenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ModeOfInvestment:any={
    "Payment_mode":"",
    "DateForMonth":"",
    "monthly_amt":"",
    "monthly_amt1":"",
  }
  monthly_amt:any = 5000; 
  monthly_amt1: Options = {
    floor: 5000,
    ceil: 5000000,
    hidePointerLabels:true,
    translate: (monthly_amt: number, label: any): string => {  
      switch (label) {  
          case label.Low:  
              return "<b>₹ 3,700</b> ₹" + monthly_amt; 
          case label.High:  
              return "<b>₹ 5,300</b> ₹" + monthly_amt;  
          default:  
              return "₹ &nbsp;" + monthly_amt + "&nbsp;(min)" ;  
      }  
    }     
  };

}
