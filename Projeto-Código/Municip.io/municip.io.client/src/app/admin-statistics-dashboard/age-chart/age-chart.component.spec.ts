import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeChartComponent } from './age-chart.component';

describe('AgeChartComponent', () => {
  let component: AgeChartComponent;
  let fixture: ComponentFixture<AgeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgeChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
