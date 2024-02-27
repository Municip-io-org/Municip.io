import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatetimepickerComponent } from './datetimepicker.component';

describe('DatetimepickerComponent', () => {
  let component: DatetimepickerComponent;
  let fixture: ComponentFixture<DatetimepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatetimepickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatetimepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
