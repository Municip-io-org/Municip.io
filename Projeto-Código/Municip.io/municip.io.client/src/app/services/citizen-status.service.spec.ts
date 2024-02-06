import { TestBed } from '@angular/core/testing';

import { CitizenStatusService } from './citizen-status.service';

describe('CitizenStatusService', () => {
  let service: CitizenStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitizenStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
