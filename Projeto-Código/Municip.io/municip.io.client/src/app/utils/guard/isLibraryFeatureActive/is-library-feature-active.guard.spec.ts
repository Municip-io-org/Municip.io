import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isLibraryFeatureActiveGuard } from './is-library-feature-active.guard';

describe('isLibraryFeatureActiveGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isLibraryFeatureActiveGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
