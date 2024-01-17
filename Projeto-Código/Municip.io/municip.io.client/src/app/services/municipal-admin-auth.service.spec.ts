import { TestBed } from '@angular/core/testing';

import { MunicipalAdminAuthService } from './municipal-admin-auth.service';

describe('MunicipalAdminAuthService', () => {
  let service: MunicipalAdminAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MunicipalAdminAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
