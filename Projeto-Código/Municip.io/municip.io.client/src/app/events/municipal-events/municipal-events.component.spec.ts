import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipalEventsComponent } from './municipal-events.component';

describe('MunicipalEventsComponent', () => {
  let component: MunicipalEventsComponent;
  let fixture: ComponentFixture<MunicipalEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MunicipalEventsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MunicipalEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
