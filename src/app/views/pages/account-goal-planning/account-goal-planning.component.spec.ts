import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountGoalPlanningComponent } from './account-goal-planning.component';

describe('AccountGoalPlanningComponent', () => {
  let component: AccountGoalPlanningComponent;
  let fixture: ComponentFixture<AccountGoalPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountGoalPlanningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountGoalPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
