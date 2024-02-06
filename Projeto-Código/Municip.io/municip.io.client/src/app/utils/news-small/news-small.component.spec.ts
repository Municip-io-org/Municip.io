import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsSmallComponent } from './news-small.component';

describe('NewsSmallComponent', () => {
  let component: NewsSmallComponent;
  let fixture: ComponentFixture<NewsSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsSmallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewsSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
