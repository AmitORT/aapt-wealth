import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundSwitchSuceesfulComponent } from './fund-switch-suceesful.component';

describe('FundSwitchSuceesfulComponent', () => {
  let component: FundSwitchSuceesfulComponent;
  let fixture: ComponentFixture<FundSwitchSuceesfulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundSwitchSuceesfulComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundSwitchSuceesfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
