import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';
import { AescryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ValidateService } from 'src/app/services/validate/validate.service';
declare var $: any;

@Component({
  selector: 'app-digital-gold-product-details',
  templateUrl: './digital-gold-product-details.component.html',
  styleUrls: ['./digital-gold-product-details.component.css']
})
export class DigitalGoldProductDetailsComponent implements OnInit {


  Action: string = "Buy";
  Amount: any;
  Weight: any;
  GoldRatePerGram: string = "";


  constructor(public route: Router, public validate: ValidateService, private toastr: ToastrService, private crypto: AescryptoService, private api: ApiService) { }

  ngOnInit(): void {

    this.getGoldRatePerGram();

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

  getGoldRatePerGram() {
    const data = {
      "amount": 0,
      "quantity": 1
    }
    this.api.post('digitalGold/trade/convert-gold', data, false, true).subscribe(resp => {
      console.log(resp)
      if (resp.response.n == 1) {
        this.GoldRatePerGram = resp.data;
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








  DoLogin() {
    if (localStorage.getItem("CustToken") == null) {
      $("#login").modal("show");
    }
    else {
      $("#update-kyc").modal("show");
    }
  }

  GoToSignUp() {
    localStorage.setItem("nextPath",this.crypto.Encrypt("/digital-gold-product-details"))
    $("#login").modal("hide");
    this.route.navigate(["/sign-in"])
  }

  Navigate() {
    this.route.navigateByUrl("/digital-gold-purchased-successful");
    $('.modal-backdrop').remove();
  }
}


