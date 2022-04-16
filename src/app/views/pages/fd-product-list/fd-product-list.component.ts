import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-fd-product-list',
  templateUrl: './fd-product-list.component.html',
  styleUrls: ['./fd-product-list.component.css']
})
export class FdProductListComponent implements OnInit {

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

      if ($('#sidebar').offset().top + $("#sidebar").height() > $("#footer").offset().top-100) {
      $('#sidebar').css('top',-($("#sidebar").offset().top + $("#sidebar").height() - $("#footer").offset().top+100));
      }

      });
  }

}
