import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isTransportFeatureActiveGuard } from './is-transport-feature-active.guard';

describe('isTransportFeatureActiveGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isTransportFeatureActiveGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
