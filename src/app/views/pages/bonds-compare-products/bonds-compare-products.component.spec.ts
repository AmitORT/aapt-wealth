import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BondsCompareProductsComponent } from './bonds-compare-products.component';

describe('BondsCompareProductsComponent', () => {
  let component: BondsCompareProductsComponent;
  let fixture: ComponentFixture<BondsCompareProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BondsCompareProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BondsCompareProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
