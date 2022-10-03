import { Component, OnInit } from '@angular/core';
import { RedirectionsService } from 'src/app/services/redirections/redirections.service';

@Component({
  selector: 'app-swp-setup-suceesful',
  templateUrl: './swp-setup-suceesful.component.html',
  styleUrls: ['./swp-setup-suceesful.component.css']
})
export class SwpSetupSuceesfulComponent implements OnInit {
  
  constructor(public redirect: RedirectionsService) { }

  ngOnInit(): void {
  }
}
