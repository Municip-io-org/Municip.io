import { CanActivateFn } from '@angular/router';

export const isDocumentsFeatureActiveGuard: CanActivateFn = (route, state) => {
  return true;
};
