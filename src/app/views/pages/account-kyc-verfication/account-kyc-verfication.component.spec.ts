import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountKycVerficationComponent } from './account-kyc-verfication.component';

describe('AccountKycVerficationComponent', () => {
  let component: AccountKycVerficationComponent;
  let fixture: ComponentFixture<AccountKycVerficationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountKycVerficationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountKycVerficationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
