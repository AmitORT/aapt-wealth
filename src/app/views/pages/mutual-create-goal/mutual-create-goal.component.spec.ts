import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutualCreateGoalComponent } from './mutual-create-goal.component';

describe('MutualCreateGoalComponent', () => {
  let component: MutualCreateGoalComponent;
  let fixture: ComponentFixture<MutualCreateGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MutualCreateGoalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MutualCreateGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
