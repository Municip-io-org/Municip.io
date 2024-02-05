import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportsMainComponent } from './transports-main.component';

describe('TransportsMainComponent', () => {
  let component: TransportsMainComponent;
  let fixture: ComponentFixture<TransportsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransportsMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransportsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
