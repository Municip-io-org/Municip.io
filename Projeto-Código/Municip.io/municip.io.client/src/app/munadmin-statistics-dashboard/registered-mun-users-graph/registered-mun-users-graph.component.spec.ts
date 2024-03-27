import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredMunUsersGraphComponent } from './registered-mun-users-graph.component';

describe('RegisteredMunUsersGraphComponent', () => {
  let component: RegisteredMunUsersGraphComponent;
  let fixture: ComponentFixture<RegisteredMunUsersGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisteredMunUsersGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisteredMunUsersGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
