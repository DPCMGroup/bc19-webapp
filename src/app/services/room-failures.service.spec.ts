import { TestBed } from '@angular/core/testing';

import { RoomFailuresService } from './room-failures.service';

describe('RoomFailuresService', () => {
  let service: RoomFailuresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomFailuresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
