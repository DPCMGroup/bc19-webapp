import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {LoginData} from '../models/login-data';
import {UserData} from '../models/user-data';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // readonly APIUrl = 'http://dpcm2077.duckdns.org:8000';

  constructor(
    private http: HttpClient,
    @Inject('apiUrl') private APIUrl: string) { }

  // LOGIN

  login(val: LoginData): Observable<UserData>{
    return this.http.post<UserData>(this.APIUrl + '/user/login', val);
  }
}
