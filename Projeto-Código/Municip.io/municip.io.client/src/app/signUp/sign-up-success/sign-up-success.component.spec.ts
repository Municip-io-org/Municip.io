import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpSuccessComponent } from './sign-up-success.component';

describe('SignUpSuccessComponent', () => {
  let component: SignUpSuccessComponent;
  let fixture: ComponentFixture<SignUpSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpSuccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignUpSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
