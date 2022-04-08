import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchRedeemFundsComponent } from './switch-redeem-funds.component';

describe('SwitchRedeemFundsComponent', () => {
  let component: SwitchRedeemFundsComponent;
  let fixture: ComponentFixture<SwitchRedeemFundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchRedeemFundsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchRedeemFundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
