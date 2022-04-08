import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { AescryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ValidateService } from 'src/app/services/Validate/validate.service';

@Component({
  selector: 'app-congratulations',
  templateUrl: './congratulations.component.html',
  styleUrls: ['./congratulations.component.css']
})
export class CongratulationsComponent implements OnInit {

  constructor(public route:Router, public validate:ValidateService, private crypto:AescryptoService, private api:ApiService) { }


  RiskProfilesubmitResponse:any;


  ngOnInit(): void {
    this.RiskProfilesubmitResponse=this.crypto.Decrypt(localStorage.getItem("RiskProfilesubmitResponse"));
    console.log("RiskProfilesubmitResponse",this.RiskProfilesubmitResponse)

  }

 

}
