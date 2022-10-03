import { Component, OnInit } from '@angular/core';
import { RedirectionsService } from 'src/app/services/redirections/redirections.service';

@Component({
  selector: 'app-fund-switch-suceesful',
  templateUrl: './fund-switch-suceesful.component.html',
  styleUrls: ['./fund-switch-suceesful.component.css']
})
export class FundSwitchSuceesfulComponent implements OnInit {
  
  constructor(public redirect: RedirectionsService) { }

  ngOnInit(): void {
  } 

}
