import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderChartComponent } from './gender-chart.component';

describe('GenderChartComponent', () => {
  let component: GenderChartComponent;
  let fixture: ComponentFixture<GenderChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenderChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenderChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
