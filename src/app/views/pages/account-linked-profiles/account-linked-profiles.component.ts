import { Component, OnInit } from '@angular/core';
declare var $ : any;

@Component({
  selector: 'app-account-linked-profiles',
  templateUrl: './account-linked-profiles.component.html',
  styleUrls: ['./account-linked-profiles.component.css']
})
export class AccountLinkedProfilesComponent implements OnInit {

  gendervalue:any;
  LinkedProfile:boolean=false;
  LinkedDetails:boolean=true;
  LinkFamily:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

  uploadFile($event:any) {
    var reader = new FileReader();
    reader.readAsDataURL($event.target.files[0]);
    reader.onload = function () {
    var ThumbnailBase64 = reader.result;
    console.log("thumbnail ",ThumbnailBase64);
    $("#profileimg").attr("src",ThumbnailBase64);
    }
    console.log($event.target.files[0]); // outputs the first file
    }

}
