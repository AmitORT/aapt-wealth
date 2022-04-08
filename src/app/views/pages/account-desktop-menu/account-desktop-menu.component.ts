import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-account-desktop-menu',
  templateUrl: './account-desktop-menu.component.html',
  styleUrls: ['./account-desktop-menu.component.css']
})
export class AccountDesktopMenuComponent implements OnInit {

  constructor(public route:Router) { }

  ngOnInit(): void {
  }

}
