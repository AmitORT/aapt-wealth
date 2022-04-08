import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPortfolioProductDetailsComponent } from './account-portfolio-product-details.component';

describe('AccountPortfolioProductDetailsComponent', () => {
  let component: AccountPortfolioProductDetailsComponent;
  let fixture: ComponentFixture<AccountPortfolioProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountPortfolioProductDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPortfolioProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
