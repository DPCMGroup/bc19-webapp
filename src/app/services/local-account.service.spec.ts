import { TestBed } from '@angular/core/testing';

import { LocalAccountService } from './local-account.service';
import {LoginData} from '../models/login-data';

describe('LocalAccountService', () => {
  let service: LocalAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalAccountService]
    });
    service = TestBed.inject(LocalAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve credentials', () => {
    localStorage.setItem('username', 'ciao1');
    localStorage.setItem('password', 'ciao2');
    expect(service.retrieveLocalCredentials().username).toBe('ciao1');
    expect(service.retrieveLocalCredentials().password).toBe('ciao2');
  });

  it('should save credentials', () => {
    const data = new LoginData();
    data.username = 'ciao3';
    data.password = 'ciao4';
    service.saveCredentialsLocally(data);
    expect(localStorage.getItem('username')).toBe(data.username);
    expect(localStorage.getItem('password')).toBe(data.password);
  });

  it('should delete credentials', () => {
    localStorage.setItem('username', 'ciao5');
    localStorage.setItem('password', 'ciao6');
    expect(localStorage.getItem('username')).toBe('ciao5');
    expect(localStorage.getItem('password')).toBe('ciao6');
    service.deleteSavedCredentials();
    expect(localStorage.getItem('username')).toBe(null);
    expect(localStorage.getItem('password')).toBe(null);
  });
});
