import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdDetailsComponent } from './fd-details.component';

describe('FdDetailsComponent', () => {
  let component: FdDetailsComponent;
  let fixture: ComponentFixture<FdDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FdDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FdDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
