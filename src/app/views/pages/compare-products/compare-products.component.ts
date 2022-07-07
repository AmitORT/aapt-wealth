import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { AescryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ValidateService } from 'src/app/services/validate/validate.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-compare-products',
  templateUrl: './compare-products.component.html',
  styleUrls: ['./compare-products.component.css']
})
export class CompareProductsComponent implements OnInit {

  ShowCompare: boolean = false;
  ShowSelectedDetails: boolean = false;
  MutualProductCompareFund: any;
  OffersForCompare: any = [];
  PreminumTime: boolean = false;
  PreminumTime2: boolean = false;
  PreminumTime1: boolean = false;
  PremiumTimeModel: any;
  inputListforGraph: any = [];
  public_series: any;
  chartData: any;
  dataLabels: any;
  stroke: any;
  xaxis: any;
  tooltip: any;
  GraphList: any = [];
  Graph: any = [];


  GraphYSeriesData: any = [];
  GraphXSeriesData: any = [];


  constructor(private crypto: AescryptoService, private toastr: ToastrService, public validate: ValidateService, private api: ApiService, private route: Router) {

    this.public_series = []

    this.chartData = {
      height: 350,
      type: "area"
    }

    this.dataLabels = {
      enabled: false
    }

    this.stroke = {
      curve: "smooth"
    }

    this.xaxis = {
      type: "date",
      categories: []
    }

    this.tooltip = {
      x: {
        format: "dd/MM/yy HH:mm"
      }
    }
  }

  ngOnInit(): void {
    this.scrolltotop();

    this.MutualProductCompareFund = this.crypto.Decrypt(localStorage.getItem("MutualProductCompareFund"));
    // console.log("MutualProductCompareFund", this.MutualProductCompareFund)
    this.MutualProductCompareFund.forEach((element: any) => {
      element.selectedYear = 1;
      element.Rate = element.returnFor1Year?.toFixed(2);
    });
    this.OffersForCompare = this.MutualProductCompareFund.filter((a: any) => a.checkforcompare == 1);
    // console.log("OffersForCompare", this.OffersForCompare);

    this.getGraphDetailsToCompare();

  }
  scrolltotop() {
    $('.body-color').animate({
      scrollTop: 0
    }, 0);
  }

  GraphYSeries: any = [];
  GraphXSeries: any = [];

  getGraphDetailsToCompare() {
    // debugger
    this.inputListforGraph = [];
    this.GraphXSeries = [];
    this.GraphYSeries = [];

    for (var i = 0; i < this.OffersForCompare.length; i++) {
      this.inputListforGraph.push(this.OffersForCompare[i].id);
    }
    // console.log('inputListforGraph', this.inputListforGraph);
    var postData = new FormData();
    postData.append("compareInstruments", JSON.stringify(this.inputListforGraph));
    postData.append("filterDate", "all");
    this.api.post("wealthfy/compare-insturments", postData).subscribe(response => {
      // console.log('graph', response);
      this.GraphList = response.data;
      if (this.GraphList.length > 0) {
        for (let i = 0; i < this.GraphList.length; i++) {
          this.GraphYSeriesData = [];
          for (let j = 0; j < this.GraphList[i].length; j++) {
            this.GraphXSeries.push((this.GraphList[i][j].priceDate).slice(0, 10));
            this.GraphYSeriesData.push(this.GraphList[i][j].price)
          }
          let data = {
            name: 'series' + [i + 1],
            data: this.GraphYSeriesData,
          }

          this.GraphYSeries.push(data);
        }
      }
      this.public_series = this.GraphYSeries;

      this.GraphXSeries = [...new Set(this.GraphXSeries)];
      this.xaxis.categories = this.GraphXSeries;

      // console.log('GraphYSeries', this.GraphYSeries)
      // console.log('GraphXSeries', this.GraphXSeries)
      // console.log('this.xaxis.categories', this.xaxis.categories)
    })
  }

  compareCheckboxclick(index: number, ID: any) {
    for (let i = 0; i < this.MutualProductCompareFund.length; i++) {
      if (this.MutualProductCompareFund[i].id == ID) {
        this.MutualProductCompareFund[i].checkforcompare = !this.MutualProductCompareFund[i].checkforcompare;
      }
    }
    if (this.MutualProductCompareFund.filter((a: any) => a.checkforcompare == 1).length > 4) {
      this.MutualProductCompareFund[index].checkforcompare = 0;
      this.toastr.error("You can add max 4 offer for compare");
    } else {
      // debugger
      this.OffersForCompare = this.MutualProductCompareFund.filter((a: any) => a.checkforcompare == 1);
      localStorage.setItem("MutualProductCompareFund", this.crypto.Encrypt(this.MutualProductCompareFund));
      this.getGraphDetailsToCompare();
      // console.log("compareoffer", this.OffersForCompare);
    }
  }

  showTenureForPopup(index: number): any {
    if (this.validate.isNullEmptyUndefined(this.MutualProductCompareFund[index].selectedYear)) {
      this.MutualProductCompareFund[index].selectedYear = 1;
      this.MutualProductCompareFund[index].Rate = this.MutualProductCompareFund[index].returnFor1Year.toFixed(2);
    } else if (this.MutualProductCompareFund[index].selectedYear == 1) {
      this.MutualProductCompareFund[index].selectedYear = 3;
      this.MutualProductCompareFund[index].Rate = this.MutualProductCompareFund[index].returnFor3Year.toFixed(2);
    } else if (this.MutualProductCompareFund[index].selectedYear == 3) {
      this.MutualProductCompareFund[index].selectedYear = 5;
      this.MutualProductCompareFund[index].Rate = this.MutualProductCompareFund[index].returnFor5Year.toFixed(2);
    } else if (this.MutualProductCompareFund[index].selectedYear == 5) {
      this.MutualProductCompareFund[index].selectedYear = 1;
      this.MutualProductCompareFund[index].Rate = this.MutualProductCompareFund[index].returnFor1Year.toFixed(2);
    }
  }

  InvestINFund(offer: any) {
    // console.log(offer);
    localStorage.setItem("SelectedMutualFund", this.crypto.Encrypt(offer));
    this.route.navigate(['/wealth-product-details']);
  }

}
