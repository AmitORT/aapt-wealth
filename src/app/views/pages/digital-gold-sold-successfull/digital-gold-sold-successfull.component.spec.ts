import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalGoldSoldSuccessfullComponent } from './digital-gold-sold-successfull.component';

describe('DigitalGoldSoldSuccessfullComponent', () => {
  let component: DigitalGoldSoldSuccessfullComponent;
  let fixture: ComponentFixture<DigitalGoldSoldSuccessfullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitalGoldSoldSuccessfullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalGoldSoldSuccessfullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
