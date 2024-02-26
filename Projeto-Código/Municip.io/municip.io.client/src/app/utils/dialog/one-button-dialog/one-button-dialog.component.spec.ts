import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneButtonDialogComponent } from './one-button-dialog.component';

describe('OneButtonDialogComponent', () => {
  let component: OneButtonDialogComponent;
  let fixture: ComponentFixture<OneButtonDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OneButtonDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OneButtonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
