import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StpSetupSuceesfulComponent } from './stp-setup-suceesful.component';

describe('StpSetupSuceesfulComponent', () => {
  let component: StpSetupSuceesfulComponent;
  let fixture: ComponentFixture<StpSetupSuceesfulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StpSetupSuceesfulComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StpSetupSuceesfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
