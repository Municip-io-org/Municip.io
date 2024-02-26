import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoButtonsComponent } from './two-buttons.component';

describe('TwoButtonsComponent', () => {
  let component: TwoButtonsComponent;
  let fixture: ComponentFixture<TwoButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TwoButtonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TwoButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
