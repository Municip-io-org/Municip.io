import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryHomepageComponent } from './library-homepage.component';

describe('LibraryHomepageComponent', () => {
  let component: LibraryHomepageComponent;
  let fixture: ComponentFixture<LibraryHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LibraryHomepageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
