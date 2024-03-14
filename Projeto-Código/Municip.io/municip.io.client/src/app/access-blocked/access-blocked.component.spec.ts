import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessBlockedComponent } from './access-blocked.component';

describe('AccessBlockedComponent', () => {
  let component: AccessBlockedComponent;
  let fixture: ComponentFixture<AccessBlockedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccessBlockedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccessBlockedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
