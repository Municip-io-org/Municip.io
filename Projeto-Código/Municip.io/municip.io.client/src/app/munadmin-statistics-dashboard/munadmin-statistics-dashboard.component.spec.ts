import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunadminStatisticsDashboardComponent } from './munadmin-statistics-dashboard.component';

describe('MunadminStatisticsDashboardComponent', () => {
  let component: MunadminStatisticsDashboardComponent;
  let fixture: ComponentFixture<MunadminStatisticsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MunadminStatisticsDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MunadminStatisticsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
