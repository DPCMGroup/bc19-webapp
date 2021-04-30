import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly APIUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  // USERS

  getUserList(): Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/user/list');
  }

  addUser(val: any): Observable<any>{
    return this.http.post(this.APIUrl + '/user/insert', val);
  }

  deleteUser(val: any): Observable<any>{
    return this.http.get(this.APIUrl + '/user/del/' + val);
  }

  modifyUser(val: any): Observable<any>{
    return this.http.post(this.APIUrl + '/user/modify', val);
  }
}
