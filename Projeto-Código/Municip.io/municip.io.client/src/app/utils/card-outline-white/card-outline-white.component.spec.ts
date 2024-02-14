import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOutlineWhiteComponent } from './card-outline-white.component';

describe('CardOutlineWhiteComponent', () => {
  let component: CardOutlineWhiteComponent;
  let fixture: ComponentFixture<CardOutlineWhiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardOutlineWhiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardOutlineWhiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
