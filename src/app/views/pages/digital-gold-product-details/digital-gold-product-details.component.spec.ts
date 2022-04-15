import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalGoldProductDetailsComponent } from './digital-gold-product-details.component';

describe('DigitalGoldProductDetailsComponent', () => {
  let component: DigitalGoldProductDetailsComponent;
  let fixture: ComponentFixture<DigitalGoldProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitalGoldProductDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalGoldProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
