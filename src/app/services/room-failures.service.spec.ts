import { TestBed } from '@angular/core/testing';

import { RoomFailuresService } from './room-failures.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('RoomFailuresService', () => {
  let service: RoomFailuresService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: 'apiUrl', useValue: 'http://dpcm2077.duckdns.org:8000'}]
    });
    service = TestBed.inject(RoomFailuresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
