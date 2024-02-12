import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsSmallComponent } from './events-small.component';

describe('EventsSmallComponent', () => {
  let component: EventsSmallComponent;
  let fixture: ComponentFixture<EventsSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventsSmallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventsSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
