import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksGenreChartComponent } from './books-genre-chart.component';

describe('BooksGenreChartComponent', () => {
  let component: BooksGenreChartComponent;
  let fixture: ComponentFixture<BooksGenreChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BooksGenreChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BooksGenreChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
