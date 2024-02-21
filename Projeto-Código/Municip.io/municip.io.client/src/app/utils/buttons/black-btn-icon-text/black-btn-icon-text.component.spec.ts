import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackBtnIconTextComponent } from './black-btn-icon-text.component';

describe('BlackBtnIconTextComponent', () => {
  let component: BlackBtnIconTextComponent;
  let fixture: ComponentFixture<BlackBtnIconTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlackBtnIconTextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlackBtnIconTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
