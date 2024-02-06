import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunAdmindashboardComponent } from './mun-admindashboard.component';

describe('MunAdmindashboardComponent', () => {
  let component: MunAdmindashboardComponent;
  let fixture: ComponentFixture<MunAdmindashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MunAdmindashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MunAdmindashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
