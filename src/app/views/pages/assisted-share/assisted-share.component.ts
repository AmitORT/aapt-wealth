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
  ProductId: any;
  SelectedMutualFund: any;
  ShowLoader:any=true;
  constructor(public activeRoute: ActivatedRoute,private route: Router, private toastr: ToastrService, private crypto: AescryptoService, public validate: ValidateService, private api: ApiService) { }

  ngOnInit(): void {
    this._paramSub = this.activeRoute.queryParams.subscribe(async params => {
      this.ProductId = params.FID;
    });
    console.log(this.ProductId);
    if (!this.validate.isNullEmptyUndefined(this.ProductId)) {
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
        console.log(this.SelectedMutualFund);
        let encryptedProduct = this.crypto.Encrypt(this.SelectedMutualFund);
        localStorage.setItem("SelectedMutualFund", encryptedProduct);
        this.route.navigate(['/wealth-product-details']);
      } else {
        this.toastr.error(resp.response.Msg);
      }
    });
  }

}
