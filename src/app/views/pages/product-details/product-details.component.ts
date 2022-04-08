import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  PreminumTime:boolean=true;
  
  constructor() { }

  ngOnInit(): void {
    $('.collapse').collapse()
  }

}
