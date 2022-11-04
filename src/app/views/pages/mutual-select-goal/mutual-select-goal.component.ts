import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/services/api/api.service';
import { AescryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ValidateService } from 'src/app/services/validate/validate.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-mutual-select-goal',
  templateUrl: './mutual-select-goal.component.html',
  styleUrls: ['./mutual-select-goal.component.css']
})
export class MutualSelectGoalComponent implements OnInit {

  customOptions: OwlOptions = {
    items: 3,
    margin: 3,
    loop: true,
    stagePadding: 64,
    responsive: {
      0: { items: 1, stagePadding: 30 },
      480: { items: 1, stagePadding: 60 },
      600: { items: 2, stagePadding: 30 },
      1000: { items: 3 },
      1200: { items: 3 }
    },
    nav: true,
    // navText: ['Back','Next'],
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

  CreateGoalResponse: any;
  CreateGoalList: any;
  SelectedGoal: any;
  InvestWithoutGoalResp: any;
  MyGoals: any;
  Token: any;
  CreateGoalListToken: any;
  goals: any;
  id: any;
  SelectedMutualFund: any;
  ProductOverview: any = [];
  ApplicantData:any;

  constructor(public route: Router, public validate: ValidateService, private crypto: AescryptoService, private api: ApiService, private toastr: ToastrService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.scrolltotop();
    if (localStorage.getItem("ProductOverview") != null) {
      this.ProductOverview = this.crypto.Decrypt(localStorage.getItem("ProductOverview"));
      // console.log('ngoninit ProductOverview', this.ProductOverview);
    }
    if (localStorage.getItem("SelectedMutualFund") != null) {
      this.SelectedMutualFund = this.crypto.Decrypt(localStorage.getItem("SelectedMutualFund"))
      // console.log("SelectedMutualFund", this.SelectedMutualFund);
    }

    if(localStorage.getItem("ApplicantData") != null){
      this.ApplicantData = this.crypto.Decrypt(localStorage.getItem("ApplicantData"))
      // console.log("ApplicantData", this.ApplicantData);
    }
    this.GetMyGoals();
  }
  scrolltotop() {
    $('.body-color').animate({
      scrollTop: 0
    }, 0);
  }


  GetMyGoals() {
    this.api.get("goalDetails/create-goal", true).subscribe(resp => {
      if (resp.response.n == 1) {
        this.MyGoals = resp.data;
        // console.log("my goals", this.MyGoals);
        // let encrypted = this.crypto.Encrypt(resp.data);
        // localStorage.setItem("GoalsList", encrypted);

      }
      else {
        this.toastr.error(resp.msg);
      }
    })
  }

  GetSelectedGoals(index: number) {
    this.MyGoals[index].selectGoal = !this.MyGoals[index].selectGoal;
    this.SelectedGoal = this.MyGoals.filter((a: any) => a.selectGoal == 1);
    // localStorage.setItem("GetSelectedGoals", this.crypto.Encrypt(this.SelectedGoal));
    // console.log("SelectedGoal", this.SelectedGoal[0]);

    // for (var i = 0; i < this.ProductOverview.length; i++) {
    //   if (this.ProductOverview[i].id == this.SelectedMutualFund.id) {
    //     this.ProductOverview[i].CreatedGoal = this.SelectedGoal[0];
    //   }
    // }
    // console.log('product with CreatedGoal', this.ProductOverview);
    // let encryptedProduct = this.crypto.Encrypt(this.ProductOverview);
    // localStorage.setItem("ProductOverview", encryptedProduct);



    this.SelectedMutualFund.CreatedGoal = this.SelectedGoal[0];
    // console.log('SelectedMutualFund', this.SelectedMutualFund);


    if (this.ProductOverview.length > 0) {
      var flag = true;
      for (var i = 0; i < this.ProductOverview.length; i++) {
        if (this.ProductOverview[i].id == this.SelectedMutualFund.id) {
          this.ProductOverview[i].CreatedGoal = this.SelectedGoal[0];
          flag = false;
          break;
        }
      }
      if (flag) {
        this.ProductOverview.push(this.SelectedMutualFund);
      }
    }
    else {
      this.ProductOverview.push(this.SelectedMutualFund);
    }
    // console.log('ProductOverview', this.ProductOverview);

    let encryptedProduct = this.crypto.Encrypt(this.ProductOverview);
    localStorage.setItem("ProductOverview", encryptedProduct);


    this.route.navigate(["/mutual-fund-cart"]);
  }

  CreateInvestor() {
    if (localStorage.getItem("CustToken") == null) {
      localStorage.setItem("nextPath", this.crypto.Encrypt("/mutual-fund-cart"))
      this.route.navigate(["/sign-in"])
    }
    else {

      var data = { 'panCardNumber': 'IFSPS1505L', 'name': 'Gaurdian1911', 'gender': 1, 'birthDate': '1965-01-01', 'relation': 1 };
      var postData = new FormData();
      postData.append("birth_date", this.ApplicantData.dob);
      postData.append("investor_type", "1");
      postData.append("pan", this.ApplicantData.panCard);
      // postData.append("date_of_incorporation", "2020-01-01T06:30:00.000Z");
      // postData.append("guardian_details", JSON.stringify(data));
      this.api.post("wealthfy/add-update-investor-details", postData, true).subscribe(response => {
        // console.log('inverstor create', response)
        if (response.response.n == 1) {
          this.InvestWithoutGoal();
        }
      })
    }
  }

  InvestWithoutGoal() {
    debugger
    var postData = new FormData();
    postData.append("transactionTypeId", "1");
    postData.append("instrumentId",this.SelectedMutualFund.id);
    postData.append("totalAmount", this.SelectedMutualFund.ModeOfInvestment.Payment_mode == '1'? this.SelectedMutualFund.ModeOfInvestment.monthly_amt : this.SelectedMutualFund.ModeOfInvestment.yearly_amt );
    postData.append("modeOfTransaction", this.SelectedMutualFund.ModeOfInvestment.Payment_mode);
    postData.append("frequency", "4");
    postData.append("transactionSubType", this.SelectedMutualFund.ModeOfInvestment.Payment_mode == "1" ? "2" : "1");
    // postData.append("frequencyDay", "1");
    postData.append("serviceProviderAccountId", this.SelectedMutualFund.serviceProviderId);
    this.api.post("wealthfy/proceed-to-cart", postData).subscribe(resp => {
      this.InvestWithoutGoalResp = resp.data;
      let encrypted = this.crypto.Encrypt(this.InvestWithoutGoalResp)
      localStorage.setItem("InvestWithoutGoal", encrypted)
      // console.log("InvestWithoutGoal", this.InvestWithoutGoalResp);

      if (this.ProductOverview.length > 0) {
        var flag = true;
        for (var i = 0; i < this.ProductOverview.length; i++) {
          if (this.ProductOverview[i].id == this.SelectedMutualFund.id) {
            flag = false;
            break;
          }
        }
        if (flag) {
          this.ProductOverview.push(this.SelectedMutualFund);
        }
      }
      else {
        this.ProductOverview.push(this.SelectedMutualFund);
      }
      // console.log('ProductOverview', this.ProductOverview);
  
      let encryptedProduct = this.crypto.Encrypt(this.ProductOverview);
      localStorage.setItem("ProductOverview", encryptedProduct);


      this.route.navigate(["/mutual-fund-cart"])
    })
  }

  CreateGoal() {
    if (localStorage.getItem("CustToken") == null) {
      localStorage.setItem("nextPath", this.crypto.Encrypt("/mutual-create-goal"))
      this.route.navigate(["/sign-in"])
    }
    else {
      this.route.navigate(["/mutual-create-goal"])
    }
  }



}


