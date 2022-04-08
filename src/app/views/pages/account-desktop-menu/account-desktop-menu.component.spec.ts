import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDesktopMenuComponent } from './account-desktop-menu.component';

describe('AccountDesktopMenuComponent', () => {
  let component: AccountDesktopMenuComponent;
  let fixture: ComponentFixture<AccountDesktopMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountDesktopMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDesktopMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
