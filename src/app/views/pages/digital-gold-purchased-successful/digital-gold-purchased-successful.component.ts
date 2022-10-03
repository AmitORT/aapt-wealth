import { Component, OnInit } from '@angular/core';
import { RedirectionsService } from 'src/app/services/redirections/redirections.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-digital-gold-purchased-successful',
  templateUrl: './digital-gold-purchased-successful.component.html',
  styleUrls: ['./digital-gold-purchased-successful.component.css']
})
export class DigitalGoldPurchasedSuccessfulComponent implements OnInit {

  constructor(public redirect: RedirectionsService) { }

  ngOnInit(): void {
    localStorage.removeItem('DGAction');
    localStorage.removeItem('DGData');
  }

}
