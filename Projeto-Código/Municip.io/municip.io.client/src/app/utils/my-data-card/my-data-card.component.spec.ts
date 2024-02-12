import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDataCardComponent } from './my-data-card.component';

describe('MyDataCardComponent', () => {
  let component: MyDataCardComponent;
  let fixture: ComponentFixture<MyDataCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyDataCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyDataCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
