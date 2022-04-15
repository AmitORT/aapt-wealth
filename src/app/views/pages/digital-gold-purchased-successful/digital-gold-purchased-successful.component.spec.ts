import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalGoldPurchasedSuccessfulComponent } from './digital-gold-purchased-successful.component';

describe('DigitalGoldPurchasedSuccessfulComponent', () => {
  let component: DigitalGoldPurchasedSuccessfulComponent;
  let fixture: ComponentFixture<DigitalGoldPurchasedSuccessfulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitalGoldPurchasedSuccessfulComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalGoldPurchasedSuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
