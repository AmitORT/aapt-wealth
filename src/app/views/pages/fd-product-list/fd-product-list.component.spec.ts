import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdProductListComponent } from './fd-product-list.component';

describe('FdProductListComponent', () => {
  let component: FdProductListComponent;
  let fixture: ComponentFixture<FdProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FdProductListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FdProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
