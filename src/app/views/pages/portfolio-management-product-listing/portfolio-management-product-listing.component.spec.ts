import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioManagementProductListingComponent } from './portfolio-management-product-listing.component';

describe('PortfolioManagementProductListingComponent', () => {
  let component: PortfolioManagementProductListingComponent;
  let fixture: ComponentFixture<PortfolioManagementProductListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioManagementProductListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioManagementProductListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
