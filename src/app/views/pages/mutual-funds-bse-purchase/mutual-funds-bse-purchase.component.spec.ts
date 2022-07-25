import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutualFundsBSEPurchaseComponent } from './mutual-funds-bse-purchase.component';

describe('MutualFundsBSEPurchaseComponent', () => {
  let component: MutualFundsBSEPurchaseComponent;
  let fixture: ComponentFixture<MutualFundsBSEPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MutualFundsBSEPurchaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MutualFundsBSEPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
