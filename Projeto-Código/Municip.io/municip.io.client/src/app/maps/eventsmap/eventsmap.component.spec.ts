import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsmapComponent } from './eventsmap.component';

describe('EventsmapComponent', () => {
  let component: EventsmapComponent;
  let fixture: ComponentFixture<EventsmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventsmapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventsmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
