import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioManagementKycUpdateComponent } from './portfolio-management-kyc-update.component';

describe('PortfolioManagementKycUpdateComponent', () => {
  let component: PortfolioManagementKycUpdateComponent;
  let fixture: ComponentFixture<PortfolioManagementKycUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioManagementKycUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioManagementKycUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
