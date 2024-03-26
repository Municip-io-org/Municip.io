import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizensMapComponent } from './citizens-map.component';

describe('CitizensMapComponent', () => {
  let component: CitizensMapComponent;
  let fixture: ComponentFixture<CitizensMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CitizensMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CitizensMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
