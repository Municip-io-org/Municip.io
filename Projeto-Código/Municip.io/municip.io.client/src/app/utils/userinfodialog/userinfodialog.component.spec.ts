import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserinfodialogComponent } from './userinfodialog.component';

describe('UserinfodialogComponent', () => {
  let component: UserinfodialogComponent;
  let fixture: ComponentFixture<UserinfodialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserinfodialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserinfodialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
