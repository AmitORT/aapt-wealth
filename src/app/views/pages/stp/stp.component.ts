import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';
import { AescryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ValidateService } from 'src/app/services/validate/validate.service';
declare var $:any;

@Component({
  selector: 'app-stp',
  templateUrl: './stp.component.html',
  styleUrls: ['./stp.component.css']
})
export class StpComponent implements OnInit {

  STPLoader: boolean = false;
  SelectedMutualFund: any;
  MyHoldings: any;
  MyHoldingsProductOverviewDetails: any;
  MyGoals: any;

  STPCartItemList: any = [
    // {
    //   'isActive': 1,
    // },
    // {
    //   'isActive': 0,
    // }
  ];

  constructor(public route: Router, private toastr: ToastrService, public validate: ValidateService, private crypto: AescryptoService, private api: ApiService) { }

  ngOnInit(): void {    
  }

  scrolltotop(){
    $('.body-color').animate({
      scrollTop: 0
  }, 0);
  }
  
  

}
