import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutualSelectGoalComponent } from './mutual-select-goal.component';

describe('MutualSelectGoalComponent', () => {
  let component: MutualSelectGoalComponent;
  let fixture: ComponentFixture<MutualSelectGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MutualSelectGoalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MutualSelectGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
