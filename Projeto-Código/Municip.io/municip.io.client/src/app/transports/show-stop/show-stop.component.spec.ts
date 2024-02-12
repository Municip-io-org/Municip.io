import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowStopComponent } from './show-stop.component';

describe('ShowStopComponent', () => {
  let component: ShowStopComponent;
  let fixture: ComponentFixture<ShowStopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowStopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowStopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
