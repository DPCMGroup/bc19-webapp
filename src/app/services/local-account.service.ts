import { Injectable } from '@angular/core';
import {LoginData} from '../models/login-data';

@Injectable({
  providedIn: 'root'
})
export class LocalAccountService {

  constructor() { }

  retrieveLocalCredentials(): LoginData{
    const localCreds = new LoginData();
    localCreds.username = localStorage.getItem('username');
    localCreds.password = localStorage.getItem('password');
    return localCreds;
  }

  saveCredentialsLocally(creds: LoginData): void{
    localStorage.setItem('username', creds.username);
    localStorage.setItem('password', creds.password);
  }

  deleteSavedCredentials(): void {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
  }
}
