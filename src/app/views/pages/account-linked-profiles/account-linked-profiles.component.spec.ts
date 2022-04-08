import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountLinkedProfilesComponent } from './account-linked-profiles.component';

describe('AccountLinkedProfilesComponent', () => {
  let component: AccountLinkedProfilesComponent;
  let fixture: ComponentFixture<AccountLinkedProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountLinkedProfilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountLinkedProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
