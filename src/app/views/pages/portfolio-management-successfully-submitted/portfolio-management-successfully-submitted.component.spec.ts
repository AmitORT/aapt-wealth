import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioManagementSuccessfullySubmittedComponent } from './portfolio-management-successfully-submitted.component';

describe('PortfolioManagementSuccessfullySubmittedComponent', () => {
  let component: PortfolioManagementSuccessfullySubmittedComponent;
  let fixture: ComponentFixture<PortfolioManagementSuccessfullySubmittedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioManagementSuccessfullySubmittedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioManagementSuccessfullySubmittedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
