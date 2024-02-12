import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOutlineThemeComponent } from './card-outline-theme.component';

describe('CardOutlineThemeComponent', () => {
  let component: CardOutlineThemeComponent;
  let fixture: ComponentFixture<CardOutlineThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardOutlineThemeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardOutlineThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
