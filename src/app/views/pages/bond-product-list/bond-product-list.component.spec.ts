import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BondProductListComponent } from './bond-product-list.component';

describe('BondProductListComponent', () => {
  let component: BondProductListComponent;
  let fixture: ComponentFixture<BondProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BondProductListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BondProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
