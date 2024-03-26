import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStatisticsDashboardComponent } from './admin-statistics-dashboard.component';

describe('AdminStatisticsDashboardComponent', () => {
  let component: AdminStatisticsDashboardComponent;
  let fixture: ComponentFixture<AdminStatisticsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminStatisticsDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminStatisticsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
