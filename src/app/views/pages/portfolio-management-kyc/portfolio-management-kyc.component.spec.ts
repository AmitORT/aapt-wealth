import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioManagementKycComponent } from './portfolio-management-kyc.component';

describe('PortfolioManagementKycComponent', () => {
  let component: PortfolioManagementKycComponent;
  let fixture: ComponentFixture<PortfolioManagementKycComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioManagementKycComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioManagementKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
