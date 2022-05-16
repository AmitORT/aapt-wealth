import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdCompareProductsComponent } from './fd-compare-products.component';

describe('FdCompareProductsComponent', () => {
  let component: FdCompareProductsComponent;
  let fixture: ComponentFixture<FdCompareProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FdCompareProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FdCompareProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
