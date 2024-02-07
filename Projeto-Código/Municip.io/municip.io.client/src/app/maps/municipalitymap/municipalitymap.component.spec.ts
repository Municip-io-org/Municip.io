import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipalitymapComponent } from './municipalitymap.component';

describe('MunicipalitymapComponent', () => {
  let component: MunicipalitymapComponent;
  let fixture: ComponentFixture<MunicipalitymapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MunicipalitymapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MunicipalitymapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
