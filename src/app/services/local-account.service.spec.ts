import { TestBed } from '@angular/core/testing';

import { LocalAccountService } from './local-account.service';

describe('LocalAccountService', () => {
  let service: LocalAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
