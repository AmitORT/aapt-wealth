import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskProfilingComponent } from './risk-profiling.component';

describe('RiskProfilingComponent', () => {
  let component: RiskProfilingComponent;
  let fixture: ComponentFixture<RiskProfilingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskProfilingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskProfilingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
