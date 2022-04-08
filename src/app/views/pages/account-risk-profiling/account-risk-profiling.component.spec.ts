import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRiskProfilingComponent } from './account-risk-profiling.component';

describe('AccountRiskProfilingComponent', () => {
  let component: AccountRiskProfilingComponent;
  let fixture: ComponentFixture<AccountRiskProfilingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountRiskProfilingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountRiskProfilingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
