import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticalHomePageCardComponent } from './statistical-home-page-card.component';

describe('StatisticalHomePageCardComponent', () => {
  let component: StatisticalHomePageCardComponent;
  let fixture: ComponentFixture<StatisticalHomePageCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatisticalHomePageCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatisticalHomePageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
