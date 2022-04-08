import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeemFundsComponent } from './redeem-funds.component';

describe('RedeemFundsComponent', () => {
  let component: RedeemFundsComponent;
  let fixture: ComponentFixture<RedeemFundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedeemFundsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedeemFundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
