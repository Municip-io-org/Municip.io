import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipalCalendarComponent } from './municipal-calendar.component';

describe('MunicipalCalendarComponent', () => {
  let component: MunicipalCalendarComponent;
  let fixture: ComponentFixture<MunicipalCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MunicipalCalendarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MunicipalCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
