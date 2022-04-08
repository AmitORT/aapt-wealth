import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutualFundCartComponent } from './mutual-fund-cart.component';

describe('MutualFundCartComponent', () => {
  let component: MutualFundCartComponent;
  let fixture: ComponentFixture<MutualFundCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MutualFundCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MutualFundCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
