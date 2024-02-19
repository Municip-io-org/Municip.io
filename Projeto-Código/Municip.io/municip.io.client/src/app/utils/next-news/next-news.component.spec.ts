import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextNewsComponent } from './next-news.component';

describe('NextNewsComponent', () => {
  let component: NextNewsComponent;
  let fixture: ComponentFixture<NextNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NextNewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NextNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
