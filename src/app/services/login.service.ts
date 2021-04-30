import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {LoginData} from '../models/login-data';
import {UserData} from '../models/user-data';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  readonly APIUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  // LOGIN

  login(val: LoginData): Observable<UserData>{
    return this.http.post<UserData>(this.APIUrl + '/user/login', val);
  }
}
