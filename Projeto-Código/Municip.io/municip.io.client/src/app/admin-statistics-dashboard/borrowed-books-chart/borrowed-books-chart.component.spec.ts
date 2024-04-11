import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowedBooksChartComponent } from './borrowed-books-chart.component';

describe('BorrowedBooksChartComponent', () => {
  let component: BorrowedBooksChartComponent;
  let fixture: ComponentFixture<BorrowedBooksChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BorrowedBooksChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BorrowedBooksChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
