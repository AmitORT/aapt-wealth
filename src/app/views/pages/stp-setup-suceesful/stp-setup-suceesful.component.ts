import { Component, OnInit } from '@angular/core';
import { RedirectionsService } from 'src/app/services/redirections/redirections.service';

@Component({
  selector: 'app-stp-setup-suceesful',
  templateUrl: './stp-setup-suceesful.component.html',
  styleUrls: ['./stp-setup-suceesful.component.css']
})
export class StpSetupSuceesfulComponent implements OnInit {

  constructor(public redirect: RedirectionsService) { }

  ngOnInit(): void {
  }
}
