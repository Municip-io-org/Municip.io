import { TestBed } from '@angular/core/testing';

import { AdminStatisticsService } from './admin-statistics.service';

describe('AdminstatisticsService', () => {
  let service: AdminstatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminstatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
