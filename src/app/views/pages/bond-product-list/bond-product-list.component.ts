import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-bond-product-list',
  templateUrl: './bond-product-list.component.html',
  styleUrls: ['./bond-product-list.component.css']
})
export class BondProductListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    $(".body-color").scroll(function () {
      if($(".body-color").scrollTop() > 150) {
      $('#sidebar').css('position','fixed');
      $('#sidebar').css('top','10%');
      $('#sidebar').css('width',$("#sidebar-main").width()+'px');
      }
      else if ($(".body-color").scrollTop() <= 150) {
      $('#sidebar').css('position','');
      $('#sidebar').css('top','');
      $('#sidebar').css('width','');
      }    

      if ($('#sidebar').offset()?.top + $("#sidebar").height() > $("#footer").offset()?.top-100) {
      $('#sidebar').css('top',-($("#sidebar").offset()?.top + $("#sidebar").height() - $("#footer").offset().top+100));
      }

      });
  }

}
