import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';
import { AescryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ValidateService } from 'src/app/services/validate/validate.service';

@Component({
  selector: 'app-assisted-share',
  templateUrl: './assisted-share.component.html',
  styleUrls: ['./assisted-share.component.css']
})
export class AssistedShareComponent implements OnInit {
  _paramSub: any;
  QueryToken: any;
  ProductId: any;
  SelectedMutualFund: any;
  ShowLoader: any = true;
  ViewFund: any = 2;
  constructor(public activeRoute: ActivatedRoute, private route: Router, private toastr: ToastrService, private crypto: AescryptoService, public validate: ValidateService, private api: ApiService) { }

  ngOnInit(): void {
    this._paramSub = this.activeRoute.queryParams.subscribe(async params => {
      this.QueryToken = params.TOKEN;
      this.ProductId = params.FID;
      this.ViewFund = params.VIEWFUND;
    });
    console.log('ViewFund', this.ViewFund);

    if (!this.validate.isNullEmptyUndefined(this.QueryToken) && this.QueryToken != 'null' && this.QueryToken != "{TOKEN}") {
      this.QueryToken = decodeURIComponent(this.QueryToken);
      localStorage.setItem("CustToken", this.QueryToken);
      this.api.get("auth/customer/user", true).subscribe(async response => {
        localStorage.setItem("ApplicantData", this.crypto.Encrypt(response.data));
      })
    }

    if (!this.validate.isNullEmptyUndefined(this.ProductId) && this.ProductId != 'null' && this.ProductId != "{FID}") {
      this.GetProductDetail();
    }

  }

  GetProductDetail() {
    var orderby = [{ "name": "weight", "sort": "DESC" }];
    var postData = new FormData();
    postData.append("instrumentId", this.ProductId);
    postData.append("limit", "10");
    postData.append("offset", "0");
    postData.append("holdinglimit", "10");
    postData.append("orderBy", JSON.stringify(orderby));
    postData.append("whereClause", "{}");
    this.api.post("wealthfy/get-product-overview", postData).subscribe((resp: any) => {
      console.log("GetProductDetail", resp)
      if (resp.response.n == 1) {
        this.SelectedMutualFund = resp.data.productOverview[0];
        // console.log(this.SelectedMutualFund);
        let encryptedProduct = this.crypto.Encrypt(this.SelectedMutualFund);
        localStorage.setItem("SelectedMutualFund", encryptedProduct);
        localStorage.setItem("ViewFund", this.ViewFund);
        this.route.navigate(['/wealth-product-details']);
      } else {
        this.toastr.error(resp.response.Msg);
      }
    });
  }

}
