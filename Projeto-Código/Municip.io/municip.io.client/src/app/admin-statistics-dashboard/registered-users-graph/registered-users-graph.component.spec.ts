import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredUsersGraphComponent } from './registered-users-graph.component';

describe('RegisteredUsersGraphComponent', () => {
  let component: RegisteredUsersGraphComponent;
  let fixture: ComponentFixture<RegisteredUsersGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisteredUsersGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisteredUsersGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
