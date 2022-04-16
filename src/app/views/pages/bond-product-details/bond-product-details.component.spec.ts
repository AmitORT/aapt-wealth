import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BondProductDetailsComponent } from './bond-product-details.component';

describe('BondProductDetailsComponent', () => {
  let component: BondProductDetailsComponent;
  let fixture: ComponentFixture<BondProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BondProductDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BondProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
