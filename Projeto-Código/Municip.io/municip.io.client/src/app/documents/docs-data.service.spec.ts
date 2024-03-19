import { TestBed } from '@angular/core/testing';

import { DocsDataService } from './docs-data.service';

describe('DocsDataService', () => {
  let service: DocsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
