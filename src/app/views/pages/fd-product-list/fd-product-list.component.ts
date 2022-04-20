import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
declare var $:any;

@Component({
  selector: 'app-fd-product-list',
  templateUrl: './fd-product-list.component.html',
  styleUrls: ['./fd-product-list.component.css']
})
export class FdProductListComponent implements OnInit {

  ProductOfferForBinding:any;
  ProductOffer:any;
  OffersForCompare:any=[];
  MutualProductCompareFund:any;

  constructor(private toastr: ToastrService) { }

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

  compareCheckboxclick(index:number){
    this.ProductOfferForBinding[index].checkforcompare=!this.ProductOfferForBinding[index].checkforcompare;
    
   if(this.ProductOfferForBinding.filter((a:any)=>a.checkforcompare==1).length>4){
     this.ProductOfferForBinding[index].checkforcompare=0;
    alert("You can add max 4 offer for compare");
   }else{
     this.OffersForCompare=this.ProductOfferForBinding.filter((a:any)=>a.checkforcompare==1);
    //  localStorage.setItem("MutualProductCompareFund",this.crypto.Encrypt(this.ProductOfferForBinding));
    //  console.log("compareoffer",this.OffersForCompare);
   }
  }

  RemoveFromCompare(model:any,i:any){
    console.log("model",model)
    this.OffersForCompare.splice(i,1);    
    
    this.ProductOfferForBinding.forEach((element: any) => {
      if(element.id==model.id){
        element.checkforcompare=0;  
      }
    });
  }

  cancelcompare(){
    this.ProductOfferForBinding.forEach(function(item:any){
        item.checkforcompare=0;
    });
    this.OffersForCompare=[];
  }

  SelectFund(){
    this.toastr.warning('Select a product from above list');
  }

}
