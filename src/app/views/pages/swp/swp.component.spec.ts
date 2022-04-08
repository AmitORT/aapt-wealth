import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwpComponent } from './swp.component';

describe('SwpComponent', () => {
  let component: SwpComponent;
  let fixture: ComponentFixture<SwpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
