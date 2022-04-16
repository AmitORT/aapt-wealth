import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdEligibilityComponent } from './fd-eligibility.component';

describe('FdEligibilityComponent', () => {
  let component: FdEligibilityComponent;
  let fixture: ComponentFixture<FdEligibilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FdEligibilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FdEligibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
