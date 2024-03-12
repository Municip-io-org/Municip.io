import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentAproveCardComponent } from './document-aprove-card.component';

describe('DocumentAproveCardComponent', () => {
  let component: DocumentAproveCardComponent;
  let fixture: ComponentFixture<DocumentAproveCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentAproveCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentAproveCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
