import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallerBannerComponent } from './smaller-banner.component';

describe('SmallerBannerComponent', () => {
  let component: SmallerBannerComponent;
  let fixture: ComponentFixture<SmallerBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SmallerBannerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SmallerBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
