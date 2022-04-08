import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountProfileDetailsComponent } from './account-profile-details.component';

describe('AccountProfileDetailsComponent', () => {
  let component: AccountProfileDetailsComponent;
  let fixture: ComponentFixture<AccountProfileDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountProfileDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
