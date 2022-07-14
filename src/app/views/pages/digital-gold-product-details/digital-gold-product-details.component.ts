import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';
import { AescryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ValidateService } from 'src/app/services/validate/validate.service';
import { WindowRefService } from 'src/app/services/window-ref/window-ref.service';
declare var $: any;

@Component({
  selector: 'app-digital-gold-product-details',
  templateUrl: './digital-gold-product-details.component.html',
  styleUrls: ['./digital-gold-product-details.component.css']
})
export class DigitalGoldProductDetailsComponent implements OnInit {

  Action: any = "Buy";
  Amount: any;
  Weight: any;
  GoldRatePerGram: string = "";
  QuoteResponse: any;
  validateCreateOrderResponse: any;
  ApplicantData: any;
  PortfolioBalance:any;
  calculationType:any='A';

  constructor(public route: Router, public validate: ValidateService, private toastr: ToastrService, private crypto: AescryptoService, private api: ApiService, private winRef: WindowRefService) { }

  async ngOnInit(): Promise<void> {
    debugger
    if (localStorage.getItem('DGAction') != null) {
      this.Action = localStorage.getItem('DGAction');
      localStorage.removeItem('DGAction');
    }
    this.Action == "Buy" ? await this.GetBuyAmountPerGram() : await this.GetSellAmountPerGram();

    if (localStorage.getItem('DGProceed') == '1') {
      this.Action == "Buy" ? this.validateCreateOrder() : '';
    }

    if (localStorage.getItem("ApplicantData") != null) {
      this.ApplicantData = this.crypto.Decrypt(localStorage.getItem("ApplicantData"));
      console.log(this.ApplicantData)
    }

    // this.GetPortfolioBalance();

    $(".body-color").scroll(function () {
      if ($(".body-color").scrollTop() > 150) {
        $('#sidebar').css('position', 'fixed');
        $('#sidebar').css('top', '10%');
        $('#sidebar').css('width', $("#sidebar-main").width() + 'px');
      }
      else if ($(".body-color").scrollTop() <= 150) {
        $('#sidebar').css('position', '');
        $('#sidebar').css('top', '');
        $('#sidebar').css('width', '');
      }

      if ($('#sidebar').offset()?.top + $("#sidebar").height() > $("#footer").offset()?.top - 100) {
        $('#sidebar').css('top', -($("#sidebar").offset()?.top + $("#sidebar").height() - $("#footer").offset().top + 100));
      }

    });
  }

  async GetBuyAmountPerGram() {
    return new Promise(async (resolve, reject) => {
      try {
        this.api.get("digitalGold/trade/quote-buy", false, true).subscribe(async resp => {
          if (resp.response.n == 1) {
            this.GoldRatePerGram = resp.data.totalAmount;
            this.QuoteResponse = resp.data;
            console.log('QuoteResponse', this.QuoteResponse)
            resolve(0);
          }
        })
      }
      catch (err) {
        reject(err);
      }
    });
  }

  async GetSellAmountPerGram() {
    return new Promise(async (resolve, reject) => {
      try {
        this.api.get("digitalGold/trade/quote-sell", false, true).subscribe(async resp => {
          if (resp.response.n == 1) {
            this.GoldRatePerGram = resp.data.totalAmount;
            this.QuoteResponse = resp.data;
            console.log('QuoteResponse', this.QuoteResponse)
            resolve(0);
          }
        })
      }
      catch (err) {
        reject(err);
      }
    });
  }

  GetPortfolioBalance() {
    this.api.get("digitalGold/oat/get-portfolio-balance", true, true).subscribe(resp => {
      console.log('digitalGold/oat/get-portfolio-balance',resp)
      if(resp.response.n==1){
        this.PortfolioBalance = resp.data.balQuantity;
      }
    })
  }

  GetConvertedGold(para: string) {
    para == 'Amount' ? this.Weight = 0 : this.Amount = 0;
    const data = {
      "amount": parseFloat(this.Amount),
      "quantity": parseFloat(this.Weight),
    }
    this.api.post('digitalGold/trade/convert-gold', data, false, true).subscribe(resp => {
      if (resp.response.n == 1) {
        para == 'Amount' ? this.Weight = resp.data.toFixed(2) : this.Amount = resp.data.toFixed(2);
      }
    })
  }

  CheckLogin() {
    if (localStorage.getItem("CustToken") == null) {
      $("#login").modal("show");
    }
    else {
      // alert(this.calculationType)
      // $("#update-kyc").modal("show");
      this.validateCreateOrder();
    }
  }

  GoToSignUp() {
    localStorage.setItem("nextPath", this.crypto.Encrypt("/digital-gold-product-details"));
    localStorage.setItem("DGAction", this.Action);
    $("#login").modal("hide");
    this.route.navigate(["/sign-in"])
  }

  validateCreateOrder() {
    if(this.validate.isNullEmptyUndefined(this.Amount) && this.calculationType == 'A'){
      this.toastr.error('Please Enter the Amount');
    }
    else if(this.validate.isNullEmptyUndefined(this.Weight) && this.calculationType == 'Q'){
      this.toastr.error('Please Enter the Weight/Quantity');
    }
    else{
      debugger
      const data = {
        "quoteId": this.QuoteResponse.quoteId,//
        "transactionDate": "2020-08-03 10:10:10.123",//no
        "transactionOrderID": "FIN1654579916296000000001",//no
        "quantity": this.Weight,
        "preTaxAmount": this.QuoteResponse.preTaxAmount,//
        "tax1Amt": this.QuoteResponse.tax1Amt,//
        "tax2Amt": this.QuoteResponse.tax2Amt,//
        "tax3Amt": "727.63",
        "tax3Perc": "0.075",
        "totalAmount": this.Amount,//
        "calculationType": this.calculationType,
        "customerRefNo": "11211"//no
      }
      this.api.post("digitalGold/trade/validate-create-order", data, true, true).subscribe(resp => {
        console.log('validateCreateOrder', resp)
        if (resp.response.n == 1) {
          this.validateCreateOrderResponse = resp.data;
          this.PayWithRazor();
          localStorage.removeItem('DGProceed');
        }
      })
    }
   
    
  }

  PayWithRazor() {
    debugger
    const options: any = {
      "key": this.validateCreateOrderResponse.key,// Enter the Key ID returned from validateAndCreateOrder
      "currency": "INR", //optional
      "name": "Glide", //optional
      "description": "Gold Purchase", //optional
      "image": "https://******.com/glide.jpg", // optional
      "order_id": this.validateCreateOrderResponse.id,  //Enter the Order ID returned from validateAndCreateOrder
      "handler": function (response: any) {
        console.log(response.razorpay_payment_id);
        console.log(response.razorpay_order_id);
        console.log(response.razorpay_signature)
      },
      "prefill": {
        "name": this.ApplicantData.firstName,   // optional username can be passed here
        "email": this.ApplicantData.email, // optional user email can be passed here
        "contact": this.ApplicantData.mobileNumber // optional user contact number can be passed here
      },
      "notes": {
        "address": "Razorpay Corporate Office" // optional
      },
      "theme": {
        "color": "#CA2907" //optional
      }
    }
    console.log('resp', options.handler.response)
    options.handler = ((response: any, error: any) => {
      debugger
      options.response = response;
      console.log(response);
      console.log(options);
      // call your backend api to verify payment signature & capture transaction
      const data = {
        "quoteId": this.QuoteResponse.quoteId,
        "transactionDate": "2020-08-03 10:10:10.123",
        "payIn": {
          "pgPaymentId": options.response.razorpay_payment_id,
          "pgOrderId": options.response.razorpay_order_id,
          "pgSignature": options.response.razorpay_signature
        }
      }
      this.api.post("digitalGold/trade/execute-order-with-payin", data, true, true).subscribe(resp => {
        console.log('razor pay check', resp)
        if(resp.response.n==1){
          window.location.href ='/digital-gold-purchased-successful';
        }
      })
    });
    // options.modal.ondismiss=(()=>{

    // });
    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
  }
}


