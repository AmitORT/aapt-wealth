import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-stp-setup-suceesful',
  templateUrl: './stp-setup-suceesful.component.html',
  styleUrls: ['./stp-setup-suceesful.component.css']
})
export class StpSetupSuceesfulComponent implements OnInit {

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
