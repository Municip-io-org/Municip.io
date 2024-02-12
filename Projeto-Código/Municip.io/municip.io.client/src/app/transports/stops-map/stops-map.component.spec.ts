import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopsMapComponent } from './stops-map.component';

describe('StopsMapComponent', () => {
  let component: StopsMapComponent;
  let fixture: ComponentFixture<StopsMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StopsMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StopsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
