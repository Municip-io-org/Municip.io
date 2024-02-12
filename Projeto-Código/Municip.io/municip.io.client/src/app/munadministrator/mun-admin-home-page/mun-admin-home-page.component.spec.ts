import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunAdminHomePageComponent } from './mun-admin-home-page.component';

describe('MunAdminHomePageComponent', () => {
  let component: MunAdminHomePageComponent;
  let fixture: ComponentFixture<MunAdminHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MunAdminHomePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MunAdminHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
