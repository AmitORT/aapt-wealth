import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mutual-investment',
  templateUrl: './mutual-investment.component.html',
  styleUrls: ['./mutual-investment.component.css']
})
export class MutualInvestmentComponent implements OnInit {

  Portfolio:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

}
