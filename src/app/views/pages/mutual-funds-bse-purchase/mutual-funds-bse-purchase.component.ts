import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';
import { AescryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ValidateService } from 'src/app/services/validate/validate.service';

@Component({
  selector: 'app-mutual-funds-bse-purchase',
  templateUrl: './mutual-funds-bse-purchase.component.html',
  styleUrls: ['./mutual-funds-bse-purchase.component.css']
})
export class MutualFundsBSEPurchaseComponent implements OnInit {

  AppendOrderResponse: any;
  
  constructor(public route: Router, public validate: ValidateService, private crypto: AescryptoService, private api: ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (localStorage.getItem("AppendOrderResponse") != null) {
      this.AppendOrderResponse = this.crypto.Decrypt(localStorage.getItem("AppendOrderResponse"));
      console.log('AppendOrderResponse', this.AppendOrderResponse)
    }
  }

}
