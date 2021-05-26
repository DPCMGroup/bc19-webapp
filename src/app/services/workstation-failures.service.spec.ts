import { TestBed } from '@angular/core/testing';

import { WorkstationFailuresService } from './workstation-failures.service';

describe('WorkstationFailuresService', () => {
  let service: WorkstationFailuresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkstationFailuresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
