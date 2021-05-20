import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UserData} from '../models/user-data';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // readonly APIUrl = 'http://dpcm2077.duckdns.org:8000';

  constructor(private http: HttpClient,
              @Inject('apiUrl') private APIUrl: string) { }

  // USERS

  getUserList(): Observable<UserData[]>{
    return this.http.get<UserData[]>(this.APIUrl + '/user/list');
  }

  addUser(val: UserData): Observable<string>{
    return this.http.post<string>(this.APIUrl + '/user/insert', val);
  }

  deleteUser(val: number): Observable<string>{
    return this.http.get<string>(this.APIUrl + '/user/del/' + val);
  }

  modifyUser(val: UserData): Observable<string>{
    return this.http.post<string>(this.APIUrl + '/user/modify', val);
  }
}
