import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isNewsFeaturesActiveGuard } from './is-news-features-active.guard';

describe('isNewsFeaturesActiveGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isNewsFeaturesActiveGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
