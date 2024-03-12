import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardMunicipalAdminsComponent } from './admin-dashboard-municipal-admins.component';

describe('AdminDashboardMunicipalAdminsComponent', () => {
  let component: AdminDashboardMunicipalAdminsComponent;
  let fixture: ComponentFixture<AdminDashboardMunicipalAdminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminDashboardMunicipalAdminsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminDashboardMunicipalAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
