import { TestBed } from '@angular/core/testing';

import { CustomDateFormatterService } from './custom-date-formatter.service';

describe('CustomDateFormatterService', () => {
  let service: CustomDateFormatterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomDateFormatterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
