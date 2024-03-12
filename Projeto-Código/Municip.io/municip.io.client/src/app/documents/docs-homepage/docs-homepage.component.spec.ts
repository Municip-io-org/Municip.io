import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsHomepageComponent } from './docs-homepage.component';

describe('DocsHomepageComponent', () => {
  let component: DocsHomepageComponent;
  let fixture: ComponentFixture<DocsHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocsHomepageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocsHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
