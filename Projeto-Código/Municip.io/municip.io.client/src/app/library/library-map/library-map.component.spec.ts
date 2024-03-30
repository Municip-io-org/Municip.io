import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryMapComponent } from './library-map.component';

describe('LibraryMapComponent', () => {
  let component: LibraryMapComponent;
  let fixture: ComponentFixture<LibraryMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LibraryMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
