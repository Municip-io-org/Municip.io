import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipalProfileComponent } from './municipal-profile.component';

describe('MunicipalProfileComponent', () => {
  let component: MunicipalProfileComponent;
  let fixture: ComponentFixture<MunicipalProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MunicipalProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MunicipalProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
