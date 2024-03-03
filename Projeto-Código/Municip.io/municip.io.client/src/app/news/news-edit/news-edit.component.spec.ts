import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsEditComponent } from './news-edit.component';

describe('NewsEditComponent', () => {
  let component: NewsEditComponent;
  let fixture: ComponentFixture<NewsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
