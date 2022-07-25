import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';
import { AescryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ValidateService } from 'src/app/services/validate/validate.service';

@Component({
  selector: 'app-mutual-funds-payment',
  templateUrl: './mutual-funds-payment.component.html',
  styleUrls: ['./mutual-funds-payment.component.css']
})
export class MutualFundsPaymentComponent implements OnInit {

  ConfirmedCartResponse: any;
  AppendOrderResponse: any;
  PaymentType: any;

  constructor(public route: Router, public validate: ValidateService, private crypto: AescryptoService, private api: ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (localStorage.getItem("ConfirmedCartResponse") != null) {
      this.ConfirmedCartResponse = this.crypto.Decrypt(localStorage.getItem("ConfirmedCartResponse"));
      console.log('ConfirmedCartResponse', this.ConfirmedCartResponse)
    }
  }

  ProceedToPayment() {
    if (this.validate.isNullEmptyUndefined(this.PaymentType)) {
      this.toastr.error("Please select your payment method");
    }
    else {
      const data = {
        "options": {
          "paymentMode": this.PaymentType,
          "mandateId": null,
          "bankAccountId": null
        },
        "orderId": this.ConfirmedCartResponse.id
      }
      this.api.post("wealthfy/append-orders", data, true).subscribe(response => {
        console.log("wealthfy/append-orders", response);
        if (response.response.n == 1) {
          this.AppendOrderResponse = response.data;
          localStorage.setItem('AppendOrderResponse', this.crypto.Encrypt(this.AppendOrderResponse));          
          this.route.navigate(["/mutual-funds-BSE-purchase"]);
        }
      })
    }
  }

}
