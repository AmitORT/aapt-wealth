import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/services/api/api.service';
import { AescryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ValidateService } from 'src/app/services/validate/validate.service';
import { ToastrService } from 'ngx-toastr';

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


  constructor(public route: Router, public validate: ValidateService, private crypto: AescryptoService, private api: ApiService, private toastr: ToastrService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.GetMyGoals();
  }


  GetMyGoals() {
    this.api.get("goalDetails/create-goal", true).subscribe(resp => {
      if (resp.response.n == 1) {
        this.MyGoals = resp.data;
        let encrypted=this.crypto.Encrypt(resp.data);
        localStorage.setItem("GoalsList",encrypted);
      
        // console.log("my goals",this.MyGoals);
      }
      else {
        this.toastr.error(resp.msg);
      }
    })
  }

  GetSelectedGoals(index: number) {
    this.MyGoals[index].selectGoal = !this.MyGoals[index].selectGoal;
    this.SelectedGoal = this.MyGoals.filter((a: any) => a.selectGoal == 1);
    localStorage.setItem("GetSelectedGoals", this.crypto.Encrypt(this.SelectedGoal));
    console.log("SelectedGoal", this.SelectedGoal);
    this.route.navigate(["/mutual-fund-cart"]);
  }

  CreateInvestor() {
    if (localStorage.getItem("CustToken") == null) {
      this.route.navigate(["/sign-in"])
    }
    else {

      var data={'panCardNumber': 'IFSPS1505L','name': 'Gaurdian1911','gender': 1,'birthDate': '1965-01-01','relation': 1};
      var postData = new FormData();
      postData.append("birth_date", "2000-01-01T06:30:00.000Z");
      postData.append("investor_type", "1");
      postData.append("pan", "AAXPB4698R");
      postData.append("date_of_incorporation", "2020-01-01T06:30:00.000Z");
      postData.append("guardian_details",JSON.stringify(data));
      this.api.post("wealthfy/add-update-investor-details", postData, true).subscribe(response => {
        console.log('inverstor create', response)
        if(response.response.n==1){
          this.InvestWithoutGoal();
        }
      })
    }
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
    this.api.post("wealthfy/proceed-to-cart", postData).subscribe(resp => {
      this.InvestWithoutGoalResp = resp.data;
      let encrypted = this.crypto.Encrypt(this.InvestWithoutGoalResp)
      localStorage.setItem("InvestWithoutGoal", encrypted)
      console.log("InvestWithoutGoal", this.InvestWithoutGoalResp)
      this.route.navigate(["/mutual-fund-cart"])
    })
  }

  CreateGoal() {
    if (localStorage.getItem("CustToken") == null) {
      this.route.navigate(["/sign-in"])
    }
    else {
      this.route.navigate(["/mutual-create-goal"])
    }
  }



}


