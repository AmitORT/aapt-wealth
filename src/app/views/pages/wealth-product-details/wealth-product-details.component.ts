import { Component, OnInit, ViewChild } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidateService } from 'src/app/services/validate/validate.service';
import { ApiService } from 'src/app/services/api/api.service';
import { AescryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ToastrService } from 'ngx-toastr';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke
} from "ng-apexcharts";
import { analyzeAndValidateNgModules, ConditionalExpr } from '@angular/compiler';
declare var $ : any;

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};


@Component({
  selector: 'app-wealth-product-details',
  templateUrl: './wealth-product-details.component.html',
  styleUrls: ['./wealth-product-details.component.css']
})

export class WealthProductDetailsComponent implements OnInit {
  @ViewChild("chart")
  chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;
  flag:boolean=false;
  PreminumTime:boolean=true;

  customOptions: OwlOptions = {
    items: 3,
		margin: 3,
		loop: true,
		stagePadding: 64,
		responsive:{
			0:{items:1,stagePadding: 30},
			480:{items:1,stagePadding: 30},
			600:{items:2,stagePadding: 30},
			1000:{items:3},
			1200:{items:3}
		},
		nav: true,
      // navText: ['Back','Next'],
      navText: ["<img src='assets/img/arrow_left.svg'>","<img src='assets/img/arrow_right.svg'>"],
      dots: false,
      dotsEach: true,
      lazyLoad: false,
      autoplay: true,
      autoplaySpeed: 500,
      navSpeed: 500,
      autoplayTimeout: 5000,
      autoplayHoverPause: true
  }

  value12:any = 7; 
  options12: Options = {
    floor: 3700,
    ceil: 5300,
    hidePointerLabels:true,
    translate: (value12: number, label: any): string => {  
      switch (label) {  
          case label.Low:  
              return "<b>Rs. 3,700</b> Rs." + value12; 
          case label.High:  
              return "<b>Rs. 5,300</b> Rs." + value12;  
          default:  
              return "Rs.&nbsp;" + value12 + "&nbsp;" ;  
      }  
    }     
  };

  monthly_amt:any = 500; 
  monthly_amt1: Options = {
    floor: 500,
    ceil: 100000,
    hidePointerLabels:true,
    translate: (monthly_amt: number, label: any): string => {  
      switch (label) {  
          case label.Low:  
              return "<b>₹ 3,700</b> ₹" + monthly_amt; 
          case label.High:  
              return "<b>₹ 5,300</b> ₹" + monthly_amt;  
          default:  
              return "₹ &nbsp;" + monthly_amt + "&nbsp;" ;  
      }  
    }     
  };
  
  yearly_amt:any = 500; 
  yearly_amt1: Options = {
    floor: 500,
    ceil: 100000,
    hidePointerLabels:true,
    translate: (yearly_amt: number, label: any): string => {  
      switch (label) {  
          case label.Low:  
              return "<b>₹ 3,700</b> ₹" + yearly_amt; 
          case label.High:  
              return "<b>₹ 5,300</b> ₹" + yearly_amt;  
          default:  
              return "₹ &nbsp;" + yearly_amt + "&nbsp;" ;  
      }  
    }     
  };

  SimilarProducts:any;
  ProductManager:any;
  ProductOverview:any;
  Productreturn:any;
  ProductSectorDetails:any;
  holdings:any;
  select_amt:any;
  SetModeOfInvestment:any;
  ShowCarousel:any;
  ProductList:any;
  private routeSub: any;
  id: any;
  SelectedMutualFund:any;
  public_series:any;
  chartData:any;
  dataLabels:any;
  stroke:any;
  xaxis:any;
  tooltip:any;
  ModeOfInvestment:any={
    "Payment_mode":"1",
    "DateForMonth":"15",
    "monthly_amt":"",
    "yearly_amt":""
  }
 

  constructor(public route:Router, public validate:ValidateService, private toastr: ToastrService , private crypto:AescryptoService, private api:ApiService, private router: ActivatedRoute) {
    this.chartOptions = {
      // series: [
      //   {
      //     name: "series1",
      //     data: [31, 40, 28, 51, 42, 109, 100]
      //   },
      //   {
      //     name: "series2",
      //     data: [11, 32, 45, 32, 34, 52, 41]
      //   }
      // ],
      // chart: {
      //   height: 350,
      //   type: "area"
      // },
      // dataLabels: {
      //   enabled: false
      // },
      // stroke: {
      //   curve: "smooth"
      // },
      // xaxis: {
      //   type: "datetime",
      //   categories: [
      //     "2018-09-19T00:00:00.000Z",
      //     "2018-09-19T01:30:00.000Z",
      //     "2018-09-19T02:30:00.000Z",
      //     "2018-09-19T03:30:00.000Z",
      //     "2018-09-19T04:30:00.000Z",
      //     "2018-09-19T05:30:00.000Z",
      //     "2018-09-19T06:30:00.000Z"
      //   ]
      // },
      // tooltip: {
      //   x: {
      //     format: "dd/MM/yy HH:mm"
      //   }
      // }
      
    };


    this.public_series = [
      {
        name: "series1",
        data: [],
        color: "#e27e28"
      },
      // {
      //   name: "series2",
      //   data: [11, 32, 45, 32, 34, 52, 41]
      // }
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
        // "2018-09-19T00:00:00.000Z",
        // "2018-09-19T01:30:00.000Z",
        // "2018-09-19T02:30:00.000Z",
        // "2018-09-19T03:30:00.000Z",
        // "2018-09-19T04:30:00.000Z",
        // "2018-09-19T05:30:00.000Z",
        // "2018-09-19T06:30:00.000Z"
      ]
    }
    this.tooltip= {
      x: {
        format: "dd/MM/yy HH:mm"
      }
    }

   
  
   
   }

  ngOnInit(): void {
  
    this.SelectedMutualFund=this.crypto.Decrypt(localStorage.getItem("SelectedMutualFund"))
    console.log("SelectedMutualFund",this.SelectedMutualFund)
    
    this.GetProductDetail();
    this.GetGraphData();

    this.ModeOfInvestment=this.crypto.Decrypt(localStorage.getItem("ModeOfInvestment"));
    // console.log("ModeOfInvestment",this.ModeOfInvestment)

  
    $(".body-color").scroll(function () {
      if($(".body-color").scrollTop() > 150) {
      $('#sidebar').css('position','fixed');
      $('#sidebar').css('top','13%');
      $('#sidebar').css('width',$("#sidebar-main").width()+'px');

      }
      else if ($(".body-color").scrollTop() <= 150) {
      $('#sidebar').css('position','');
      $('#sidebar').css('top','');
      $('#sidebar').css('width','');
      }
      if ($('#sidebar').offset()?.top + $("#sidebar").height() > $("#footer").offset()?.top-350) {
      $('#sidebar').css('top',-($("#sidebar").offset()?.top + $("#sidebar").height() - $("#footer").offset()?.top+350));
      }
      });

     this.scrolltotop();
     
    
  }


  GraphDataList: any = [];
  GraphDataArrayForYaxis: any = [];
  GraphDataArrayForXaxis: any = [];
  GraphCurrentValue: any;
  GraphCurrentDate: any;
  GetGraphData(){
    var postData=new FormData();  
    postData.append("instrumentId",this.SelectedMutualFund.id);
    postData.append("filterDate","all");
    this.api.post("wealthfy/get-fetch-nav",postData).subscribe(response=>{
      console.log("graph data",response)     
      this.GraphDataList = response.data;
      this.GraphCurrentValue = this.GraphDataList[this.GraphDataList.length - 1].price;
      this.GraphCurrentDate = this.GraphDataList[this.GraphDataList.length - 1].priceDate
     // console.log("graph data1", this.GraphDataList[this.GraphDataList.length - 1].priceDate);
      
      for (var i = 0; i <= this.GraphDataList.length; i++) {
        this.GraphDataArrayForYaxis.push(this.GraphDataList[i]?.price)
        this.GraphDataArrayForXaxis.push(this.GraphDataList[i]?.priceDate);
      }
      // console.log('GraphDataArrayForYaxis',this.GraphDataArrayForYaxis)
      this.public_series[0].data = this.GraphDataArrayForYaxis;
      // console.log('public series data',this.public_series[0].data);

      // console.log('GraphDataArrayForYaxis',this.GraphDataArrayForYaxis)
      this.xaxis.categories = this.GraphDataArrayForXaxis;
      console.log('categories', this.xaxis.categories);
      
    })
  }

  scrolltotop(){
    $('.body-color').animate({
      scrollTop: 0
  }, 0);
  }

  GetOnlyDay(){    
    this.ModeOfInvestment.DateForMonth=this.ModeOfInvestment.DateForMonth.slice(8);
  }

  showTenureForPopup(){
    if(this.validate.isNullEmptyUndefined(this.SelectedMutualFund.selectedYear)){
      this.SelectedMutualFund.selectedYear=1;
      this.SelectedMutualFund.Rate=this.SelectedMutualFund.returnFor1Year.toFixed(2);
    }else if(this.SelectedMutualFund.selectedYear==1){
      this.SelectedMutualFund.selectedYear=3;
      this.SelectedMutualFund.Rate=this.SelectedMutualFund.returnFor3Year.toFixed(2);
    }else if(this.SelectedMutualFund.selectedYear==3){
      this.SelectedMutualFund.selectedYear=5;
      this.SelectedMutualFund.Rate=this.SelectedMutualFund.returnFor5Year.toFixed(2);
    }else if(this.SelectedMutualFund.selectedYear==5){
      this.SelectedMutualFund.selectedYear=1;
      this.SelectedMutualFund.Rate=this.SelectedMutualFund.returnFor1Year.toFixed(2);
    }
  }


  CreateSip(){
   
    if(this.validate.isNullEmptyUndefined(this.ModeOfInvestment.Payment_mode)){
      this.toastr.error('Payment Mode is mandatory');
    }
    else if(this.ModeOfInvestment.Payment_mode == 1 && this.validate.isNullEmptyUndefined(this.ModeOfInvestment.DateForMonth)){
      this.toastr.error('Date is mandatory');
    }
    else{
      $("#invest-screen").modal("hide");
      let encrypted=this.crypto.Encrypt(this.ModeOfInvestment);
      localStorage.setItem("ModeOfInvestment",encrypted);
  
      this.route.navigate(['/mutual-select-goal']);

      $('.body-color').animate({
        scrollTop: 0
    }, 0);
    } 
  }

  GetProductDetail(){
    
    var orderby=[{"name": "weight", "sort": "DESC"}];

    var postData=new FormData();
    // this.id
    postData.append("instrumentId",this.SelectedMutualFund.id);
    postData.append("limit","10");
    postData.append("offset","0");
    postData.append("holdinglimit","10");
    postData.append("orderBy",JSON.stringify(orderby));
    postData.append("whereClause","{}");

    this.api.post("wealthfy/get-product-overview",postData).subscribe((resp: any)=>{
    
      console.log("resp",resp)
      if(resp.response.n==1){
        this.ProductManager=resp.data.productManager;
        this.ProductOverview=resp.data.productOverview;
        this.Productreturn=resp.data.productReturn;
        this.ProductSectorDetails=resp.data.productSectorDetails;
        this.SimilarProducts=resp.data.similarProducts;  
        this.holdings=resp.data.fetchHoldings.instrumentHoldings;   
        
        let encrypted=this.crypto.Encrypt(this.ProductOverview);
        localStorage.setItem("ProductOverview",encrypted);
        // console.log(this.ProductSectorDetails)
      }else{
        alert(resp.response.Msg)
      }
    });
  }

  public generateData(baseval: any, count: any, yrange: { max: any; min: any; }) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

      series.push([x, y, z]);
      baseval += 86400000;
      i++;
    }
    return series;
  }

}
