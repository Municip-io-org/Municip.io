import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentApproveCardComponent } from './document-approve-card.component';

describe('DocumentApproveCardComponent', () => {
  let component: DocumentApproveCardComponent;
  let fixture: ComponentFixture<DocumentApproveCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentApproveCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentApproveCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
