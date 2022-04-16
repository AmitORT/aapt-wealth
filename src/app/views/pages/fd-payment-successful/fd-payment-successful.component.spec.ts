import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdPaymentSuccessfulComponent } from './fd-payment-successful.component';

describe('FdPaymentSuccessfulComponent', () => {
  let component: FdPaymentSuccessfulComponent;
  let fixture: ComponentFixture<FdPaymentSuccessfulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FdPaymentSuccessfulComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FdPaymentSuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
