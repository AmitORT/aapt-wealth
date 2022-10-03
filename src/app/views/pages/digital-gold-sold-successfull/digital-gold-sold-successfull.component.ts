import { Component, OnInit } from '@angular/core';
import { RedirectionsService } from 'src/app/services/redirections/redirections.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-digital-gold-sold-successfull',
  templateUrl: './digital-gold-sold-successfull.component.html',
  styleUrls: ['./digital-gold-sold-successfull.component.css']
})
export class DigitalGoldSoldSuccessfullComponent implements OnInit {

  constructor(public redirect: RedirectionsService) { }

  ngOnInit(): void {
    localStorage.removeItem('DGAction');
    localStorage.removeItem('DGData');
  }

}
