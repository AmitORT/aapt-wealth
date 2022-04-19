import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioManagementProductDetailsComponent } from './portfolio-management-product-details.component';

describe('PortfolioManagementProductDetailsComponent', () => {
  let component: PortfolioManagementProductDetailsComponent;
  let fixture: ComponentFixture<PortfolioManagementProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioManagementProductDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioManagementProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
