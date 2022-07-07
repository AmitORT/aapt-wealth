import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-account-profile-details',
  templateUrl: './account-profile-details.component.html',
  styleUrls: ['./account-profile-details.component.css']
})
export class AccountProfileDetailsComponent implements OnInit {

  gendervalue:any;

  constructor() { }

  ngOnInit(): void {
  }

  uploadFile($event:any) {
    var reader = new FileReader();
    reader.readAsDataURL($event.target.files[0]);
    reader.onload = function () {
    var ThumbnailBase64 = reader.result;
    // console.log("thumbnail ",ThumbnailBase64);
    $("#profileimg").attr("src",ThumbnailBase64);
    }
    // console.log($event.target.files[0]); // outputs the first file
    }

}
