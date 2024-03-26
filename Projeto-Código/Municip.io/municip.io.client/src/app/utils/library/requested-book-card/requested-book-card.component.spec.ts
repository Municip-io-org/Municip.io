import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedBookCardComponent } from './requested-book-card.component';

describe('RequestedBookCardComponent', () => {
  let component: RequestedBookCardComponent;
  let fixture: ComponentFixture<RequestedBookCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestedBookCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestedBookCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
