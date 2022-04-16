import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BondSuccessfulComponent } from './bond-successful.component';

describe('BondSuccessfulComponent', () => {
  let component: BondSuccessfulComponent;
  let fixture: ComponentFixture<BondSuccessfulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BondSuccessfulComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BondSuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
