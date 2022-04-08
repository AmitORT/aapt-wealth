import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutualPaymentSuccessfulComponent } from './mutual-payment-successful.component';

describe('MutualPaymentSuccessfulComponent', () => {
  let component: MutualPaymentSuccessfulComponent;
  let fixture: ComponentFixture<MutualPaymentSuccessfulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MutualPaymentSuccessfulComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MutualPaymentSuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
