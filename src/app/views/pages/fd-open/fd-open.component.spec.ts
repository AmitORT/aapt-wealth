import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdOpenComponent } from './fd-open.component';

describe('FdOpenComponent', () => {
  let component: FdOpenComponent;
  let fixture: ComponentFixture<FdOpenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FdOpenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FdOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
