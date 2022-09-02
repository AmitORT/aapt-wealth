import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';
import { AescryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ValidateService } from 'src/app/services/validate/validate.service';
import { WindowRefService } from 'src/app/services/window-ref/window-ref.service';
import { environment } from 'src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-digital-gold-product-details',
  templateUrl: './digital-gold-product-details.component.html',
  styleUrls: ['./digital-gold-product-details.component.css']
})
export class DigitalGoldProductDetailsComponent implements OnInit {

  Action: any = "buy";
  Amount: any;
  Weight: any;
  GoldRatePerGram: string = "";
  QuoteResponse: any;
  validateCreateOrderResponse: any;
  ApplicantData: any;
  PortfolioBalance: any;
  calculationType: any = 'A';
  paymentChannel: any = "UPI"
  Token: any;
  CommonUrl = environment.CommonUrl;
  QuoteID: any;

  VPA: any;
  AccountNumber: any;
  BankName: any;
  IFSCCode: any;
  DGLoginEmail = environment.DGLoginEmail;
  DGLoginPassword = environment.DGLoginPassword;

  DGData: any = {
    'calculationType': '',
    'Amount': '',
    'Weight': '',
    'QuoteID': '',
  };

  constructor(public route: Router, public validate: ValidateService, private toastr: ToastrService, private crypto: AescryptoService, private api: ApiService, private winRef: WindowRefService) { }

  async ngOnInit(): Promise<void> {
    this.GetSession();
    debugger
    if (localStorage.getItem("ApplicantData") != null) {
      this.ApplicantData = this.crypto.Decrypt(localStorage.getItem("ApplicantData"));
      console.log(this.ApplicantData);
      this.GetPortfolioBalance();
    }
    if (localStorage.getItem('DGAction') != null) {
      this.Action = localStorage.getItem('DGAction');
      localStorage.removeItem('DGAction');
    }

    if (localStorage.getItem("DGData") != null) {
      this.DGData = this.crypto.Decrypt(localStorage.getItem("DGData"));
      console.log('DGData', this.DGData);
      this.calculationType = this.DGData.calculationType;
      this.Amount = this.DGData.Amount;
      this.Weight = this.DGData.Weight;
      var action = this.calculationType == 'A' ? 'Amount' : 'Weight';
      this.GetConvertedGold(action);
    }
    // this.Action == "buy" ? await this.GetBuyAmountPerGram() : await this.GetSellAmountPerGram();
    setTimeout(() => {
      if (localStorage.getItem('DGProceed') == '1') {
        // this.Action == "buy" ? this.validateCreateOrder() : $("#Customer-account-info").modal("show");
        this.CheckLogin();
      }

    }, 2000);





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

  GetSession() {
    const data = {
      "email": this.DGLoginEmail,
      "password": this.DGLoginPassword,
    }
    this.api.post('digitalGold/security/login', data).subscribe(resp => {
      console.log('dg', resp)
      if (resp.response.n == 1) {
        localStorage.setItem('DGSessionID', this.crypto.Encrypt(resp.data.sessionid));
        this.Action == "buy" ? this.GetBuyAmountPerGram() : this.GetSellAmountPerGram();
      }
    })
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

  ResetData() {
    this.Weight = '';
    this.Amount = '';
    this.calculationType = 'A';
  }

  GetPortfolioBalance() {
    this.api.get("digitalGold/oat/get-portfolio-balance", true, true).subscribe(resp => {
      console.log('digitalGold/oat/get-portfolio-balance', resp)
      if (resp.response.n == 1) {
        this.PortfolioBalance = resp.data.balQuantity;
      }
    })
  }

  GetConvertedGold(para: string) {
    
    para == 'Amount' ? this.Weight = 0 : this.Amount = 0;

    if (para == 'Amount' && !this.validate.isNullEmptyUndefined(this.Amount) || para == 'Weight' && !this.validate.isNullEmptyUndefined(this.Weight)) {
      const data = {
        "action": this.Action,
        "amount": parseFloat(this.Amount),
        "quantity": parseFloat(this.Weight),
      }
      this.api.post('digitalGold/trade/convert-gold', data, false, true).subscribe(resp => {
        if (resp.response.n == 1) {
          para == 'Amount' ? this.Weight = resp.data.value.toFixed(2) : this.Amount = resp.data.value.toFixed(2);
          this.QuoteID = resp.data.quote_id;
        }
      })
    }

  }

  GoToCommon(path: any) {


    this.DGData.calculationType = this.calculationType;
    this.DGData.Amount = this.Amount;
    this.DGData.Weight = this.Weight;
    localStorage.setItem("DGData", this.crypto.Encrypt(this.DGData));

    this.Token = localStorage.getItem("CustToken");
    this.CommonUrl = environment.CommonUrl.replace("{TOKEN}", encodeURIComponent(this.Token));
    this.CommonUrl = this.CommonUrl.replace("{PATH}", encodeURIComponent(path));
    this.CommonUrl = this.CommonUrl.replace("{FROM}", encodeURIComponent('/digital-gold-product-details'))
    debugger
    window.location.href = this.CommonUrl;
  }

  CheckLogin() {
    debugger

    var total = Number(this.Amount) + this.ApplicantData?.totalAmount;

    if (this.validate.isNullEmptyUndefined(this.Amount) && this.calculationType == 'A') {
      this.toastr.error('Please Enter the Amount');
    }
    else if (this.validate.isNullEmptyUndefined(this.Weight) && this.calculationType == 'Q') {
      this.toastr.error('Please Enter the Weight/Quantity');
    }
    else if (localStorage.getItem("CustToken") == null) {
      $("#invest-screen").modal("hide");
      $("#login").modal("show");
    }
    else if (total > 199000 && (this.ApplicantData?.kycVerified != true)) {
      $("#update-kyc").modal("show");
    }
    else if (this.ApplicantData?.profileDetail != true) {
      this.GoToCommon('/profile-details')
    }
    else if (this.Action == 'buy') {
      this.validateCreateOrder();
    }
    else if (this.Action == 'sell') {
      $("#Customer-account-info").modal("show");
    }
  }

  GoToSignUp() {
    this.DGData.calculationType = this.calculationType;
    this.DGData.Amount = this.Amount;
    this.DGData.Weight = this.Weight;
    localStorage.setItem("DGData", this.crypto.Encrypt(this.DGData));

    localStorage.setItem("nextPath", this.crypto.Encrypt("/digital-gold-product-details"));
    localStorage.setItem("DGAction", this.Action);
    $("#login").modal("hide");
    this.route.navigate(["/sign-in"])
  }

  validateCreateOrder() {
    debugger
    var data;
    if (this.calculationType == 'A') {
      data = {
        "quoteId": this.QuoteID,
        "amount": this.Amount,
        "calculationType": this.calculationType,
      }
    }
    if (this.calculationType == 'Q') {
      data = {
        "quoteId": this.QuoteID,
        "quantity": this.Weight,
        "calculationType": this.calculationType,
      }
    }
    this.api.post("digitalGold/trade/validate-create-order", data, true, true).subscribe(resp => {
      console.log('validateCreateOrder', resp)
      if (resp.response.n == 1) {
        this.validateCreateOrderResponse = resp.data;
        this.PayWithRazor();
        localStorage.removeItem('DGProceed');
        localStorage.removeItem('DGData');
      }
      else {
        this.toastr.error(resp.response.Msg)
      }
    })
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
        "quoteId": this.QuoteID,
        "transactionDate": "2020-08-03 10:10:10.123",
        "payIn": {
          "pgPaymentId": options.response.razorpay_payment_id,
          "pgOrderId": options.response.razorpay_order_id,
          "pgSignature": options.response.razorpay_signature
        }
      }
      this.api.post("digitalGold/trade/execute-order-with-payin", data, true, true).subscribe(resp => {
        console.log('razor pay check', resp)
        debugger
        if (resp.response.n == 1) {
          localStorage.setItem("DGData", this.crypto.Encrypt(this.DGData));


          this.GetApplicantData();
          
        }
        else {
          this.toastr.error(resp.response.Msg)
        }
      })
    });
    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
  }

  ExecuteOrderWithPayout() {
    debugger
    if (this.validate.isNullEmptyUndefined(this.VPA) && this.paymentChannel == 'UPI') {
      this.toastr.error('Please Enter the VPA');
    }
    else if (this.validate.isNullEmptyUndefined(this.AccountNumber) && this.paymentChannel == 'ACCOUNT') {
      this.toastr.error('Please Enter the Account Number');
    }
    else if (!this.validate.validateAccountNumber(this.AccountNumber) && this.paymentChannel == 'ACCOUNT') {
      this.toastr.error("Please Enter valid Account Number");
    }
    else if (this.validate.isNullEmptyUndefined(this.BankName) && this.paymentChannel == 'ACCOUNT') {
      this.toastr.error('Please Enter the Bank Name');
    }
    else if (this.validate.isNullEmptyUndefined(this.IFSCCode) && this.paymentChannel == 'ACCOUNT') {
      this.toastr.error('Please Enter the IFSC Code');
    }
    else if (!this.validate.validateIFSCCode(this.IFSCCode) && this.paymentChannel == 'ACCOUNT') {
      this.toastr.error("Please enter valid IFSC Code");
    }
    else {
      var data
      if (this.calculationType == 'A') {
        data = {
          "quoteId": this.QuoteID,
          "amount": this.Amount,
          "calculationType": this.calculationType,
          "payOut": {
            "customerAccountInfo": {
              "vpa": this.paymentChannel == 'UPI' ? this.VPA : '',
              "accountNumber": this.paymentChannel == 'ACCOUNT' ? this.AccountNumber : '',
              "ifsc": this.paymentChannel == 'ACCOUNT' ? this.IFSCCode : '',
              "bankName": this.paymentChannel == 'ACCOUNT' ? this.BankName : '',
            },
            "paymentChannel": this.paymentChannel,
          }
        }
      }
      else if (this.calculationType == 'Q') {
        data = {
          "quoteId": this.QuoteID,
          "quantity": this.Weight,
          "calculationType": this.calculationType,
          "payOut": {
            "customerAccountInfo": {
              "vpa": this.paymentChannel == 'UPI' ? this.VPA : '',
              "accountNumber": this.paymentChannel == 'ACCOUNT' ? this.AccountNumber : '',
              "ifsc": this.paymentChannel == 'ACCOUNT' ? this.IFSCCode : '',
              "bankName": this.paymentChannel == 'ACCOUNT' ? this.BankName : '',
            },
            "paymentChannel": this.paymentChannel,
          }
        }
      }
      this.api.post("digitalGold/trade/execute-order-with-payout", data, true, true).subscribe(resp => {
        console.log('ExecuteOrderWithPayout', resp)
        debugger
        if (resp.response.n == 1) {
          localStorage.removeItem('DGProceed');
          localStorage.removeItem('DGData');
          this.GetApplicantData();
          // window.location.href = '/digital-gold-sold-successful';
        }
        else {
          this.toastr.error(resp.response.Msg)
        }
      })
    }
  }

  GetApplicantData() {
    this.api.get("auth/customer/user", true).subscribe(async (response: any) => {
      debugger
      console.log(response)
      localStorage.setItem("ApplicantData", this.crypto.Encrypt(response.data));
      window.location.href = '/digital-gold-purchased-successful';
    })
  }
}


