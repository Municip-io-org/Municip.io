import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpCitizenAccountComponent } from './sign-up-citizen-account.component';

describe('SignUpCitizenAccountComponent', () => {
  let component: SignUpCitizenAccountComponent;
  let fixture: ComponentFixture<SignUpCitizenAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpCitizenAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignUpCitizenAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
