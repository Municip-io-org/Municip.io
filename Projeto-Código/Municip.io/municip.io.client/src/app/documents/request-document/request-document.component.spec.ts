import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDocumentComponent } from './request-document.component';

describe('RequestDocumentComponent', () => {
  let component: RequestDocumentComponent;
  let fixture: ComponentFixture<RequestDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestDocumentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
