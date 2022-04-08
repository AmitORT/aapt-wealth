import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WealthProductListingComponent } from './wealth-product-listing.component';

describe('WealthProductListingComponent', () => {
  let component: WealthProductListingComponent;
  let fixture: ComponentFixture<WealthProductListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WealthProductListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WealthProductListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
