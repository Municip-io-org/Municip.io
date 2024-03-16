import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isEventsFeatureActiveGuard } from './is-events-feature-active.guard';

describe('isEventsFeatureActiveGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isEventsFeatureActiveGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
