import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnMunicipBlueComponent } from './btn-municip-blue.component';

describe('BtnMunicipBlueComponent', () => {
  let component: BtnMunicipBlueComponent;
  let fixture: ComponentFixture<BtnMunicipBlueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtnMunicipBlueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnMunicipBlueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
