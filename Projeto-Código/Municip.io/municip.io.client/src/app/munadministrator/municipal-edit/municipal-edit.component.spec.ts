import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipalEditComponent } from './municipal-edit.component';

describe('MunicipalEditComponent', () => {
  let component: MunicipalEditComponent;
  let fixture: ComponentFixture<MunicipalEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MunicipalEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MunicipalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
