import { TestBed } from '@angular/core/testing';

import { WorkstationFailuresService } from './workstation-failures.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('WorkstationFailuresService', () => {
  let service: WorkstationFailuresService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: 'apiUrl', useValue: 'http://dpcm2077.duckdns.org:8000'}]
    });
    service = TestBed.inject(WorkstationFailuresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
