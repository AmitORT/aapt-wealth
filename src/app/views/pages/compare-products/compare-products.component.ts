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


  GraphXSeriesData: any = [];


  constructor(private crypto: AescryptoService, private toastr: ToastrService, public validate: ValidateService, private api: ApiService, private route: Router) {

    this.public_series = [
      // {
      //   name: "series1",
      //   data: [11, 32, 45, 32, 34, 52, 41],
      //   // color: "#e27e28"
      // },
      // {
      //   name: "series2",
      //   data: [8, 38, 55, 39, 34, 52, 71],
      //   // color: "#e27e28"
      // },
    ],

      this.chartData = {
        height: 350,
        type: "area"
      }

    this.dataLabels = {
      enabled: false
    }
    this.stroke = {
      curve: "smooth"
    },
      this.xaxis = {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z"
        ]
      }
    this.tooltip = {
      x: {
        format: "dd/MM/yy HH:mm"
      }
    }
  }

  ngOnInit(): void {

    this.MutualProductCompareFund = this.crypto.Decrypt(localStorage.getItem("MutualProductCompareFund"));
    // console.log("MutualProductCompareFund", this.MutualProductCompareFund)
    this.MutualProductCompareFund.forEach((element: any) => {
      element.selectedYear = 1;
      element.Rate = element.returnFor1Year?.toFixed(2);
    });
    this.OffersForCompare = this.MutualProductCompareFund.filter((a: any) => a.checkforcompare == 1);
    console.log("OffersForCompare", this.OffersForCompare);

    this.getGraphDetailsToCompare();

  }

  GraphXSeries: any = [];

  getGraphDetailsToCompare() {
    debugger
    this.inputListforGraph = [];
    for (var i = 0; i < this.OffersForCompare.length; i++) {
      this.inputListforGraph.push(this.OffersForCompare[i].id);
    }
    // console.log('inputListforGraph', this.inputListforGraph);
    var postData = new FormData();
    postData.append("compareInstruments", JSON.stringify(this.inputListforGraph));
    postData.append("filterDate", "all");
    this.api.post("wealthfy/compare-insturments", postData).subscribe(response => {
      console.log('graph', response);
      this.GraphList = response.data;
      if (this.GraphList.length > 1) {
        for (let i = 0; i < this.GraphList.length; i++) {
          this.GraphXSeriesData = [];
          for (let j = 0; j < this.GraphList[i].length; j++) {
            this.GraphXSeriesData.push(this.GraphList[i][j].price)
          }
          let data = {
            name: 'series' + [i+1],
            data: this.GraphXSeriesData,
          }
          this.GraphXSeries.push(data);
        }
      }
      this.public_series = this.GraphXSeries;
      console.log('GraphXSeries', this.GraphXSeries)

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
      debugger
      this.OffersForCompare = this.MutualProductCompareFund.filter((a: any) => a.checkforcompare == 1);
      localStorage.setItem("MutualProductCompareFund", this.crypto.Encrypt(this.MutualProductCompareFund));
      this.getGraphDetailsToCompare();
      console.log("compareoffer", this.OffersForCompare);
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

  InvestINFund(offer:any){
    console.log(offer);
    localStorage.setItem("SelectedMutualFund", this.crypto.Encrypt(offer));
    this.route.navigate(['/wealth-product-details']);
  }

}
