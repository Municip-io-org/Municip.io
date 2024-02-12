import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMunicipalityCardComponent } from './my-municipality-card.component';

describe('MyMunicipalityCardComponent', () => {
  let component: MyMunicipalityCardComponent;
  let fixture: ComponentFixture<MyMunicipalityCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyMunicipalityCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyMunicipalityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
