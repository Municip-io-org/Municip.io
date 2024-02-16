import { TestBed } from '@angular/core/testing';

import { CustomEventTitleFormatterService } from './custom-event-title-formatter.service';

describe('CustomEventTitleFormatterService', () => {
  let service: CustomEventTitleFormatterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomEventTitleFormatterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
