import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { AescryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ValidateService } from 'src/app/services/validate/validate.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-mutual-fund-cart',
  templateUrl: './mutual-fund-cart.component.html',
  styleUrls: ['./mutual-fund-cart.component.css']
})
export class MutualFundCartComponent implements OnInit {

  // ModeOfInvestment: any;
  ModeOfInvestment: any = {
    "Payment_mode": "1",
    "DateForMonth": "15",
    "monthly_amt": "",
    "yearly_amt": ""
  }
  ProductOverview: any = [];
  SelectedGoal: any;
  ProceedCart: any;
  InvestWithoutGoal: any;
  ConfirmedCart: any;
  BankNames: any;
  SelectedBank: any = [];
  Token: any;
  CartItems: any = [];
  CommonUrl = environment.CommonUrl;

  CreatedGoal: any;

  constructor(public route: Router, public validate: ValidateService, private crypto: AescryptoService, private api: ApiService, private toastr: ToastrService) { }


  ngOnInit(): void {
    this.scrolltotop();

    if (localStorage.getItem("CreatedGoal") != null) {
      this.CreatedGoal = this.crypto.Decrypt(localStorage.getItem("CreatedGoal"));
      // console.log("CreatedGoal", this.CreatedGoal);
    }
    else {
      if (localStorage.getItem("GetSelectedGoals") != null) {
        this.CreatedGoal = this.crypto.Decrypt(localStorage.getItem("GetSelectedGoals"));
        // console.log("GetSelectedGoals", this.CreatedGoal);
      }
    }
    if (localStorage.getItem("ModeOfInvestment") != null) {
      this.ModeOfInvestment = this.crypto.Decrypt(localStorage.getItem("ModeOfInvestment"));
      // console.log("ModeOfInvestment", this.ModeOfInvestment);
    }
    if (localStorage.getItem("CartItems") != null) {
      this.CartItems = this.crypto.Decrypt(localStorage.getItem("CartItems"));
      // console.log("Newcart", this.CartItems)
    }
    if (localStorage.getItem("ProductOverview") != null) {
      this.ProductOverview = this.crypto.Decrypt(localStorage.getItem("ProductOverview"));
      // console.log('ngoninit ProductOverview', this.ProductOverview);
    }
    // for (let i = 0; i < this.CartItems.length; i++) {
    //   this.ProductOverview.push(this.CartItems[i]);
    // }
    // console.log("ProductOverview after cart items", this.ProductOverview)
    if (localStorage.getItem("InvestWithoutGoal") != null) {
      this.InvestWithoutGoal = this.crypto.Decrypt(localStorage.getItem("InvestWithoutGoal"));
      // console.log("InvestWithoutGoal", this.InvestWithoutGoal)
    }
    if (localStorage.getItem("ProceedCart") != null) {
      this.ProceedCart = this.crypto.Decrypt(localStorage.getItem("ProceedCart"));
      console.log("GotProceedCart", this.ProceedCart)
    }
    // if (localStorage.getItem("BankNames") != null) {
    //   debugger
    //   this.BankNames = this.crypto.Decrypt(localStorage.getItem("BankNames"));
    //   console.log('BankNames',this.BankNames)
    // }
    // else {
    this.GetBankDetails();
    // }
    if (localStorage.getItem("SelectedFunds") != null) {
      this.SelectedBank = this.crypto.Decrypt(localStorage.getItem("SelectedFunds"));
      // console.log('SelectedBank',this.SelectedBank)
    }

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
  scrolltotop() {
    $('.body-color').animate({
      scrollTop: 0
    }, 0);
  }

  RedirectPopup() {
    $('#compare-products-modal').modal('hide');
    this.route.navigate(['/wealth-product-listing']);
  }

  GetOnlyDay(i: any) {
    // console.log(this.ProductOverview[i].ModeOfInvestment.DateForMonth);
    // console.log(this.ProductOverview[i].ModeOfInvestment.DateForMonth.getDate())
    this.ProductOverview[i].ModeOfInvestment.DateForMonth = this.ProductOverview[i].ModeOfInvestment.DateForMonth.slice(8);

    // this.ProductOverview[i].ModeOfInvestment.DateForMonth =  cartitem.ModeOfInvestment.DateForMonth.slice(8);
  }

  GetBackToFunds() {
    // let encrypted = this.crypto.Encrypt(this.ModeOfInvestment);
    // localStorage.setItem("ModeOfInvestment", encrypted);
    this.route.navigate(["/mutual-select-goal"])
    // console.log("ChangesDataofMutualInvest", this.ModeOfInvestment)
  }

  GetBankDetails() {
    this.api.get("bankDetails/get-banks", true).subscribe(resp => {
      if (resp.response.n == 1) {
        this.BankNames = resp.data;
        // console.log("BankNames", this.BankNames)
      }
    })
  }

  AddCart(index: number, ID: any) {

    for (let i = 0; i < this.BankNames.length; i++) {
      if (this.BankNames[i].id == ID) {
        this.BankNames[i].selectBank = !this.BankNames[i].selectBank;
      }
    }
    // console.log('bank name',this.BankNames)
    if (this.BankNames.filter((a: any) => a.selectBank == 1).length > 4) {
      this.BankNames[index].selectBank == 0;
      this.toastr.info("You can add max 4 offer for compare");
    } else {
      this.SelectedBank = this.BankNames.filter((a: any) => a.selectBank == 1);
      localStorage.setItem("SelectedFunds", this.crypto.Encrypt(this.SelectedBank));
      localStorage.setItem("BankNames", this.crypto.Encrypt(this.BankNames));
      //  console.log("SelectedFunds",this.SelectedBank);
    }
  }

  ConfirmCart() {
    var uniqueId;
    var options: any = [{ "paymentMode": "NETBANKING", "mandateId": null, "bankAccountId": null }]
    if (this.ProceedCart != null) {
      uniqueId = this.ProceedCart.uniqueId;
    }
    else {
      uniqueId = this.InvestWithoutGoal.uniqueId;
    }
    // console.log("uniquiID", uniqueId)
    var postData = new FormData();
    postData.append("uniqueId", uniqueId);
    postData.append("options", JSON.stringify(options));
    this.api.post("wealthfy/confirm-cart", postData).subscribe(resp => {
      this.ConfirmedCart = resp.data;
      // console.log('confirm cart',resp.data)
      if (resp.response.n == 1) {
        this.CommontRouterUrl('/kyc-verification')
      }
      // this.route.navigate(["/mutual-payment-successful"])
    })
  }

  CommontRouterUrl(Path: any) {
    this.Token = localStorage.getItem("CustToken");
    this.CommonUrl = environment.CommonUrl.replace("{TOKEN}", encodeURIComponent(this.Token));
    this.CommonUrl = this.CommonUrl.replace("{PATH}", encodeURIComponent(Path));
    window.location.href = this.CommonUrl;
  }

  RemoveGoal(i: any) {
    this.ProductOverview[i].CreatedGoal = '';
    let encryptedProduct = this.crypto.Encrypt(this.ProductOverview);
    localStorage.setItem("ProductOverview", encryptedProduct);
  }

  DeleteFund(i: any) {
    this.ProductOverview.splice(i, 1);
    // console.log('After Delete Fund', this.ProductOverview);
    if (this.ProductOverview.length == 0) {
      localStorage.removeItem('ProductOverview');
    }
    else {
      localStorage.setItem("ProductOverview", this.crypto.Encrypt(this.ProductOverview));
    }
  }

  AssignGoal(offer: any) {
    // console.log('offer', offer);
    localStorage.setItem("SelectedMutualFund", this.crypto.Encrypt(offer));
    this.route.navigate(["/mutual-select-goal"])
  }

  democart(cartItems: any) {
    // console.log('cartItems',cartItems)
  }

}
