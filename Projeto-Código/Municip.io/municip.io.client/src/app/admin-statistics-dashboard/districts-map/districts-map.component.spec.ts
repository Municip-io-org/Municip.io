import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictsMapComponent } from './districts-map.component';

describe('DistrictsMapComponent', () => {
  let component: DistrictsMapComponent;
  let fixture: ComponentFixture<DistrictsMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DistrictsMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DistrictsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
