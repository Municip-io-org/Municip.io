import { TestBed } from '@angular/core/testing';

import { CitizenAuthService } from './citizen-auth.service';

describe('CitizenAuthService', () => {
  let service: CitizenAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitizenAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
