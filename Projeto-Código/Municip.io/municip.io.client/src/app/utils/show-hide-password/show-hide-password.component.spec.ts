import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowHidePasswordComponent } from './show-hide-password.component';

describe('ShowHidePasswordComponent', () => {
  let component: ShowHidePasswordComponent;
  let fixture: ComponentFixture<ShowHidePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowHidePasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowHidePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
