import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycPanVerificationComponent } from './kyc-pan-verification.component';

describe('KycPanVerificationComponent', () => {
  let component: KycPanVerificationComponent;
  let fixture: ComponentFixture<KycPanVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KycPanVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KycPanVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
