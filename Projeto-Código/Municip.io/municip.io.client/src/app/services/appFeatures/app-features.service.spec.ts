import { TestBed } from '@angular/core/testing';

import { AppFeaturesService } from './app-features.service';

describe('AppFeaturesService', () => {
  let service: AppFeaturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppFeaturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
