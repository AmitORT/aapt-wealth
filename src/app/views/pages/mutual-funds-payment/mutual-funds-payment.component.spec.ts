import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutualFundsPaymentComponent } from './mutual-funds-payment.component';

describe('MutualFundsPaymentComponent', () => {
  let component: MutualFundsPaymentComponent;
  let fixture: ComponentFixture<MutualFundsPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MutualFundsPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MutualFundsPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
