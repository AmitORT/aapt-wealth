import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountBankDetailsComponent } from './account-bank-details.component';

describe('AccountBankDetailsComponent', () => {
  let component: AccountBankDetailsComponent;
  let fixture: ComponentFixture<AccountBankDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountBankDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountBankDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
