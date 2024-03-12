import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentRequestCardComponent } from './document-request-card.component';

describe('DocumentRequestCardComponent', () => {
  let component: DocumentRequestCardComponent;
  let fixture: ComponentFixture<DocumentRequestCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentRequestCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentRequestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
