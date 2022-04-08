import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwpSetupSuceesfulComponent } from './swp-setup-suceesful.component';

describe('SwpSetupSuceesfulComponent', () => {
  let component: SwpSetupSuceesfulComponent;
  let fixture: ComponentFixture<SwpSetupSuceesfulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwpSetupSuceesfulComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwpSetupSuceesfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
