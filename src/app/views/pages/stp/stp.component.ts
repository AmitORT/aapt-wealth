import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-stp',
  templateUrl: './stp.component.html',
  styleUrls: ['./stp.component.css']
})
export class StpComponent implements OnInit {

  DisplayAccordion:boolean=false;
  Steps:number= 1;

  constructor() { }

  ngOnInit(): void {
    $(".applybtn-mob").hide();
    $(".body-color").scroll(function() {
      if ($(".body-color").scrollTop() > 150) {
      $(".applybtn-mob").show();
      }
      else {
      $(".applybtn-mob").hide();
      }
      });

      
    $(".body-color").scroll(function () {
      if($(".body-color").scrollTop() > 150) {
      $('#sidebar').css('position','fixed');
      $('#sidebar').css('top','5%');
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

  NextStep(){
    this.Steps++; 
  }

  scrolltotop(){
    $('.body-color').animate({
      scrollTop: 0
  }, 0);
  }
  
  ShowAccordion(){
    this.DisplayAccordion=true; 
      $("#collapseOne").collapse('hide');
      $("#collapseTwo").collapse('show');
  }

}
