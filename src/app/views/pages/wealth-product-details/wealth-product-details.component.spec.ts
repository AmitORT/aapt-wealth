import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WealthProductDetailsComponent } from './wealth-product-details.component';

describe('WealthProductDetailsComponent', () => {
  let component: WealthProductDetailsComponent;
  let fixture: ComponentFixture<WealthProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WealthProductDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WealthProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
