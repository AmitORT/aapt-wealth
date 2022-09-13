import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-swp-setup-suceesful',
  templateUrl: './swp-setup-suceesful.component.html',
  styleUrls: ['./swp-setup-suceesful.component.css']
})
export class SwpSetupSuceesfulComponent implements OnInit {

  Token: any;
  CommonUrl = environment.CommonUrl;
  
  constructor() { }

  ngOnInit(): void {
  }

  GoToCommon(para: any) {
    this.Token = localStorage.getItem("CustToken");
    this.CommonUrl = environment.CommonUrl.replace("{TOKEN}", encodeURIComponent(this.Token));
    this.CommonUrl = this.CommonUrl.replace("{PATH}", encodeURIComponent(para));
    window.location.href = this.CommonUrl;
  }
}
