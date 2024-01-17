import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpMunicipalityComponent } from './sign-up-municipality.component';

describe('SignUpMunicipalityComponent', () => {
  let component: SignUpMunicipalityComponent;
  let fixture: ComponentFixture<SignUpMunicipalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpMunicipalityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignUpMunicipalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
