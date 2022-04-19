import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioManagementCompareProductsComponent } from './portfolio-management-compare-products.component';

describe('PortfolioManagementCompareProductsComponent', () => {
  let component: PortfolioManagementCompareProductsComponent;
  let fixture: ComponentFixture<PortfolioManagementCompareProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioManagementCompareProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioManagementCompareProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
