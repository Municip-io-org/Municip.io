import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpMunicipalAdministratorAccountComponent } from './sign-up-municipal-administrator-account.component';

describe('SignUpMunicipalAdministratorAccountComponent', () => {
  let component: SignUpMunicipalAdministratorAccountComponent;
  let fixture: ComponentFixture<SignUpMunicipalAdministratorAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpMunicipalAdministratorAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignUpMunicipalAdministratorAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
