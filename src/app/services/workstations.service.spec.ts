import { TestBed } from '@angular/core/testing';

import { WorkstationsService } from './workstations.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('WorkstationService', () => {
  let service: WorkstationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: 'apiUrl', useValue: 'http://dpcm2077.duckdns.org:8000'}]
    });
    service = TestBed.inject(WorkstationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
