import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopsPageComponent } from './stops-page.component';

describe('StopsPageComponent', () => {
  let component: StopsPageComponent;
  let fixture: ComponentFixture<StopsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StopsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StopsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
