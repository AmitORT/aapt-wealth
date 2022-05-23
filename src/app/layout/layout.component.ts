import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { ValidateService } from '../services/validate/validate.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(public route:Router,private validate:ValidateService) { 
    this.route.events
    .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
    .subscribe((events: RoutesRecognized[]) => {
      this.validate.updateNavigationUrl(events[1].urlAfterRedirects,events[0].urlAfterRedirects);
    });
  }

  ngOnInit(): void {
  }

}
