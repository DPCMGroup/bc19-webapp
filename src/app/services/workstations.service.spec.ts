import { TestBed } from '@angular/core/testing';

import { WorkstationsService } from './workstations.service';

describe('WorkstationService', () => {
  let service: WorkstationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkstationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
