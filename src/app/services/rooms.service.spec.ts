import { TestBed } from '@angular/core/testing';

import { RoomsService } from './rooms.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('RoomService', () => {
  let service: RoomsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: 'apiUrl', useValue: 'http://dpcm2077.duckdns.org:8000'}]
    });
    service = TestBed.inject(RoomsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
