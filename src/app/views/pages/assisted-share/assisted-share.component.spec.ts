import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistedShareComponent } from './assisted-share.component';

describe('AssistedShareComponent', () => {
  let component: AssistedShareComponent;
  let fixture: ComponentFixture<AssistedShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssistedShareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistedShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
