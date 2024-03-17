import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isDocumentsFeatureActiveGuard } from './is-documents-feature-active.guard';

describe('isDocumentsFeatureActiveGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isDocumentsFeatureActiveGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
