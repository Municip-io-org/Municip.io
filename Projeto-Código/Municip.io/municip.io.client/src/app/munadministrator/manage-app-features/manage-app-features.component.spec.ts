import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAppFeaturesComponent } from './manage-app-features.component';

describe('ManageAppFeaturesComponent', () => {
  let component: ManageAppFeaturesComponent;
  let fixture: ComponentFixture<ManageAppFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageAppFeaturesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageAppFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
