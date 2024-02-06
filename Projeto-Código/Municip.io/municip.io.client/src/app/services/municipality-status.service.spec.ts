import { TestBed } from '@angular/core/testing';

import { MunicipalityStatusService } from './municipality-status.service';

describe('MunicipalityStatusService', () => {
  let service: MunicipalityStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MunicipalityStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
