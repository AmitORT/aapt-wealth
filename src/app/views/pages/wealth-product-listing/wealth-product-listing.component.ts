
import { Options } from '@angular-slider/ngx-slider';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidateService } from 'src/app/services/validate/validate.service';
import { AescryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ApiService } from 'src/app/services/api/api.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-product-listing',
  templateUrl: './wealth-product-listing.component.html',
  styleUrls: ['./wealth-product-listing.component.css']
})
export class WealthProductListingComponent implements OnInit {

  customOptions: OwlOptions = {
    items: 5,
    margin: 3,
    loop: false,
    responsive: {
      0: { items: 5 },
      480: { items: 5 },
      600: { items: 5 },
      1000: { items: 5 },
      1200: { items: 5 }
    },
    nav: false,
    navText: ["<img src='assets/img/arrow_left.svg'>", "<img src='assets/img/arrow_right.svg'>"],
    dots: false,
    dotsEach: true,
    lazyLoad: false,
    autoplay: true,
    autoplaySpeed: 500,
    navSpeed: 500,
    autoplayTimeout: 5000,
    autoplayHoverPause: true
  }

  customOptions1: OwlOptions = {
    items: 2,
    margin: 3,
    loop: false,
    nav: false,
    navText: ["<img src='assets/img/arrow_left.svg'>", "<img src='assets/img/arrow_right.svg'>"],
    dots: false,
    dotsEach: true,
    lazyLoad: false,
    autoplay: true,
    autoplaySpeed: 500,
    navSpeed: 500,
    autoplayTimeout: 5000,
    autoplayHoverPause: true
  }
  customOptions2: OwlOptions = {
    items: 2,
    margin: 3,
    loop: false,
    nav: false,
    navText: ["<img src='assets/img/arrow_left.svg'>", "<img src='assets/img/arrow_right.svg'>"],
    dots: false,
    dotsEach: true,
    lazyLoad: false,
    autoplay: true,
    autoplaySpeed: 500,
    navSpeed: 500,
    autoplayTimeout: 5000,
    autoplayHoverPause: true
  }

  value11: any = 5;
  options11: Options = {
    floor: 0,
    ceil: 10,
    hideLimitLabels: true,
    translate: (value11: number, label: any): string => {
      switch (label) {
        // case label.Low:  
        //     return "<b>Min 1 Lakh</b> ₹" + value11; 
        // case label.High:  
        //     return "<b>Max 5 Lakh</b> ₹" + value11;  
        default:
          return "₹" + value11 + " Lakh";
      }
    }
  };

  value12: any = 2;
  options12: Options = {
    floor: 1,
    ceil: 5,
    hidePointerLabels: true,
    translate: (value12: number, label: any): string => {
      switch (label) {
        case label.Low:
          return "<b>Min 1 Year</b> ₹" + value12;
        case label.High:
          return "<b>Max 5 Year</b> ₹" + value12;
        default:
          return value12 + "&nbsp;year";
      }
    }
  };

  value13: any = 1000;
  options13: Options = {
    floor: 500,
    ceil: 2000,
    translate: (value13: number, label: any): string => {
      switch (label) {
        case label.Low:
          return "<b>Min 1 </b> ₹" + value13;
        case label.High:
          return "<b>Max 5 </b> ₹" + value13;
        // return "&nbsp;";
        default:
          return "₹" + value13;
      }
    }
  };

  PreminumTime: boolean = true;
  OtherOffers: boolean = false;
  OfferListingLoader: boolean = true;
  ProductOfferForBinding: any;
  ProductOffer: any;
  OffersForCompare: any = [];
  CartItems: any = [];
  MutualProductCompareFund: any;
  ProductList: any = [];
  RiskProfilesubmitResponse: any;
  riskprofileId: any = 0;
  RiskProfileFilterList: any;
  AMCFilterList: any;
  CategoryFilterList: any;
  IsRiskChecked: boolean = false;
  IsAMCChecked: boolean = false;
  IsCategoryChecked: boolean = false;
  RiskFiltercheckedList: any = [];
  AMCFiltercheckedList: any = [];
  CategoryFiltercheckedList: any = [];
  GoalList: any;
  InvestWithoutGoalResp: any;
  ProductOverviewData: any;
  searchText: any = '';
  ShareUrl: any;
  ShareFundData: any;

  constructor(public route: Router, private toastr: ToastrService, public validate: ValidateService, private crypto: AescryptoService, private api: ApiService) { }

  ngOnInit(): void {
    this.scrolltotop();
    if (localStorage.getItem("RiskProfilesubmitResponse") != null) {
      this.RiskProfilesubmitResponse = this.crypto.Decrypt(localStorage.getItem("RiskProfilesubmitResponse"));
      // console.log("RiskProfilesubmitResponse", this.RiskProfilesubmitResponse);
      this.riskprofileId = 1;
    }
    else {
      this.riskprofileId = 0;
    }

    if (localStorage.getItem("ProductOverview") != null) {
      this.ProductOverview = this.crypto.Decrypt(localStorage.getItem("ProductOverview"));
      // console.log('ngoninit ProductOverview', this.ProductOverview);
    }

    this.GetRiskProfileFilterList();
    this.GetAMCFilterList();
    this.GetCategoryFilterList();
    setTimeout(() => {
      this.getOffersProductList();
    }, 0);

    // this.GoalList = this.crypto.Decrypt(localStorage.getItem("GoalsList"));
    // console.log("GoalsList" , this.GoalList)

    this.GetMyGoals()

    // if(localStorage.getItem("CartItems") != null){
    //   this.CartItems = this.crypto.Decrypt(localStorage.getItem("CartItems"));
    // }





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
        $('#sidebar').css('top', -($("#sidebar").offset()?.top + $("#sidebar").height() - $("#footer").offset()?.top + 100));
      }

    });
  }

  scrolltotop() {
    $('.body-color').animate({
      scrollTop: 0
    }, 0);
  }

  GetMyGoals() {
    this.api.get("goalDetails/create-goal", true).subscribe(resp => {
      if (resp.response.n == 1) {
        this.GoalList = resp.data;
        let encrypted = this.crypto.Encrypt(resp.data);
        localStorage.setItem("GoalsList", encrypted);

        // console.log("my goals",this.MyGoals);
      }
      else {
        this.toastr.error(resp.msg);
      }
    })
  }

  GetRiskProfileFilterList() {
    this.api.get("wealthfy/get-riskprofile-filter").subscribe(response => {
      this.RiskProfileFilterList = response.data;
      // console.log('GetRiskProfileFilterList', this.RiskProfileFilterList)
    })
  }

  GetAMCFilterList() {
    this.api.get("wealthfy/get-amc-filter").subscribe(response => {
      this.AMCFilterList = response.data;
      // console.log('AMCFilterList', this.AMCFilterList)
    })
  }

  GetCategoryFilterList() {
    this.api.get("wealthfy/get-category-filter").subscribe(response => {
      this.CategoryFilterList = response.data;
      // console.log('CategoryFilterList', this.CategoryFilterList)
    })
  }

  getList() {
    this.RiskFiltercheckedList = this.RiskProfileFilterList?.filter((x: { checked: any; }) => x.checked).map((x: { id: any; }) => x.id).join(",");
    // console.log('check list', this.RiskFiltercheckedList)
  }

  getOffersProductList() {
    this.ProductList = [];

    this.AMCFiltercheckedList = this.AMCFilterList?.filter((x: { checked: any; }) => x.checked).map((x: { id: any; }) => x.id).join(",");
    // console.log('amc check list', this.AMCFiltercheckedList);

    this.RiskFiltercheckedList = this.RiskProfileFilterList?.filter((x: { checked: any; }) => x.checked).map((x: { id: any; }) => x.id).join(",");
    // console.log('risk check list', this.RiskFiltercheckedList);

    this.CategoryFiltercheckedList = this.CategoryFilterList?.filter((x: { checked: any; }) => x.checked).map((x: { id: any; }) => x.id).join(",");
    // console.log('category check list', this.CategoryFiltercheckedList);


    var postData = new FormData();
    postData.append("searchFilter", '{"productId":5}');
    postData.append("limit", '1000');
    postData.append("offset", '0');
    postData.append("search", this.searchText)
    if (this.riskprofileId == 1) {
      postData.append("risk_profile_mapping", this.RiskProfilesubmitResponse.id);
    }
    if (this.IsRiskChecked) {
      if (this.validate.isNullEmptyUndefined(this.RiskFiltercheckedList)) {
        postData.append("risk_filter", JSON.stringify(this.RiskFiltercheckedList = []));
      }
      else {
        var RiskFiltercheckedList = this.RiskFiltercheckedList.split(',');
        postData.append("risk_filter", JSON.stringify(RiskFiltercheckedList));
        // console.log('check list', RiskFiltercheckedList)
      }
    }
    if (this.IsAMCChecked) {
      if (this.validate.isNullEmptyUndefined(this.AMCFiltercheckedList)) {
        postData.append("amc_filter", JSON.stringify(this.AMCFiltercheckedList = []));
      }
      else {
        var AMCFiltercheckedList = this.AMCFiltercheckedList.split(',');
        postData.append("amc_filter", JSON.stringify(AMCFiltercheckedList));
        // console.log('check list', AMCFiltercheckedList)
      }
    }
    if (this.IsCategoryChecked) {
      if (this.validate.isNullEmptyUndefined(this.CategoryFiltercheckedList)) {
        postData.append("category_filter", JSON.stringify(this.CategoryFiltercheckedList = []));
      }
      else {
        var CategoryFiltercheckedList = this.CategoryFiltercheckedList.split(',');
        postData.append("category_filter", JSON.stringify(CategoryFiltercheckedList));
        // console.log('check list', CategoryFiltercheckedList)
      }
    }


    this.OfferListingLoader = true;
    this.api.post("wealthfy/product-offerings", postData).subscribe((resp: any) => {
      this.OfferListingLoader = false;
      // console.log("ProductList", resp)
      if (resp.response.n != 0) {
        this.ProductList = resp.data;
        localStorage.setItem("MutualProductCompareFund", this.crypto.Encrypt(this.ProductList));
        // console.log("ProductList", this.ProductList)
        if (!this.validate.isNullEmptyUndefined(resp.riskprofileId)) {
          for (var i = 0; i < this.RiskProfileFilterList.length; i++) {
            if (this.RiskProfileFilterList[i].id == resp.riskprofileId) {
              this.RiskProfileFilterList[i].checked = true;
            }
          }
        }
      }
      else {
        // this.toastr.error(resp.response.Msg)
      }
    });
  }

  compareCheckboxclick(index: number) {
    // debugger
    this.ProductList[index].checkforcompare = !this.ProductList[index].checkforcompare;
    if (this.ProductList.filter((a: any) => a.checkforcompare == 1).length > 4) {
      this.ProductList[index].checkforcompare = 0;
      this.toastr.error("You can add max 4 offer for compare");
    } else {
      this.OffersForCompare = this.ProductList.filter((a: any) => a.checkforcompare == 1);
      localStorage.setItem("MutualProductCompareFund", this.crypto.Encrypt(this.ProductList));
      // console.log("ProductList", this.ProductList);
      // console.log("compareoffer", this.OffersForCompare);
    }
  }


  getCartItems(index: number) {
    // debugger;
    this.ProductList[index].checkCart = !this.ProductList[index].checkCart;
    // $("#riskModal1").modal("hide");
    $("#assign-goal").modal("show");
    this.CartItems = this.ProductList.filter((a: any) => a.checkCart == 1);
    localStorage.setItem("CartItems", this.crypto.Encrypt(this.CartItems));
    this.InvestWithoutGoal();
    // console.log("CartItems", this.CartItems);

  }


  RemoveFromCompare(model: any, i: any) {
    // console.log("model", model)
    this.OffersForCompare.splice(i, 1);
    this.ProductList.forEach((element: any) => {
      if (element.id == model.id) {
        element.checkforcompare = 0;
      }
    });
  }

  cancelcompare() {
    this.ProductList.forEach(function (item: any) {
      item.checkforcompare = 0;
    });
    this.OffersForCompare = [];
  }

  SelectFund() {
    this.toastr.warning('Select a product from above list');
  }

  AppliedFund(offer: any) {
    // console.log('offer', offer)
    localStorage.setItem("SelectedMutualFund", this.crypto.Encrypt(offer));
    this.route.navigate(['/wealth-product-details']);
  }

  InvestWithoutGoal() {
    var postData = new FormData();
    postData.append("transactionTypeId", "1");
    postData.append("instrumentId", "255527");
    postData.append("totalAmount", "1234");
    postData.append("modeOfTransaction", "1");
    postData.append("frequency", "4");
    postData.append("transactionSubType", "2");
    postData.append("frequencyDay", "1");
    postData.append("serviceProviderAccountId", "20753");
    this.api.post("wealthfy/proceed-to-cart", postData, true).subscribe(resp => {
      this.InvestWithoutGoalResp = resp.data;
      let encrypted = this.crypto.Encrypt(this.InvestWithoutGoalResp)
      localStorage.setItem("InvestWithoutGoal", encrypted)
      // console.log("InvestWithoutGoal", this.InvestWithoutGoalResp)
      // this.route.navigate(["/mutual-fund-cart"])
    })
  }

  // GetOffersDetails(modal:any){
  //   console.log('modal',modal.id);
  //   this.route.navigate(['/wealth-product-details/'+modal.id]);
  // }
  ProductManager: any;
  ProductOverview: any = [];
  Productreturn: any;
  ProductSectorDetails: any;
  holdings: any;
  SimilarProducts: any;

  GetProductDetail(offer: any) {
    var orderby = [{ "name": "weight", "sort": "DESC" }];

    var postData = new FormData();
    postData.append("instrumentId", offer.id);
    postData.append("limit", "10");
    postData.append("offset", "0");
    postData.append("holdinglimit", "10");
    postData.append("orderBy", JSON.stringify(orderby));
    postData.append("whereClause", "{}");

    this.api.post("wealthfy/get-product-overview", postData).subscribe((resp: any) => {

      // console.log("resp", resp)
      if (resp.response.n == 1) {
        // debugger
        // this.ProductOverviewData = resp.data;
        localStorage.setItem("ProductOverviewData", JSON.stringify(resp.data));
        // console.log(resp.data);
        // debugger

        if (this.ProductOverview.length > 0) {
          var flag = true;
          for (var i = 0; i < this.ProductOverview.length; i++) {
            if (this.ProductOverview[i].id == resp.data.productOverview.id) {
              flag = false;
              break;
            }
          }
          if (flag) {
            this.ProductOverview.push(resp.data.productOverview);
          }
        }
        else {
          this.ProductOverview.push(resp.data.productOverview);
        }



        // this.ProductOverview.push(resp.data.productOverview);
        localStorage.setItem("ProductOverview", this.crypto.Encrypt(this.ProductOverview));

        localStorage.setItem("SelectedMutualFund", this.crypto.Encrypt(offer));


        // this.ProductManager = resp.data.productManager;
        // this.Productreturn = resp.data.productReturn;
        // this.ProductSectorDetails = resp.data.productSectorDetails;
        // this.SimilarProducts = resp.data.similarProducts;
        // this.holdings = resp.data.fetchHoldings.instrumentHoldings;

        this.route.navigate(['/wealth-product-details']);

      } else {
        this.toastr.error(resp.response.Msg)
      }
    });
  }

  getoffer(offer: any){    
    this.ShareFundData=offer;
    $("#share-modal").modal('show');
    this.ShareUrl = environment.ShareUrl.replace("{FID}", encodeURIComponent(this.ShareFundData.id));

    // data-bs-toggle="modal" data-bs-target="#share-modal"
  }

  ShareFund() {
    navigator.clipboard.writeText(this.ShareUrl).then().catch(e => console.error(e));
    this.toastr.success("Link copied");
    $("#share-modal").modal('hide');
  }


}
