import { TestBed } from '@angular/core/testing';

import { TransportsService } from './transports.service';

describe('TransportsService', () => {
  let service: TransportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
