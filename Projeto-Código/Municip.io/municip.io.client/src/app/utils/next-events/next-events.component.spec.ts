import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextEventsComponent } from './next-events.component';

describe('NextEventsComponent', () => {
  let component: NextEventsComponent;
  let fixture: ComponentFixture<NextEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NextEventsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NextEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
