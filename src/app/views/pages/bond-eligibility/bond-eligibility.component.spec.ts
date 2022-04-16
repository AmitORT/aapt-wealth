import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BondEligibilityComponent } from './bond-eligibility.component';

describe('BondEligibilityComponent', () => {
  let component: BondEligibilityComponent;
  let fixture: ComponentFixture<BondEligibilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BondEligibilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BondEligibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
