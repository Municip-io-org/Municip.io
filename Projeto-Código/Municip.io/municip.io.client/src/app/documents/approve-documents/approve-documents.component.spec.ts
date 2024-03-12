import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveDocumentsComponent } from './approve-documents.component';

describe('ApproveDocumentsComponent', () => {
  let component: ApproveDocumentsComponent;
  let fixture: ComponentFixture<ApproveDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApproveDocumentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApproveDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
