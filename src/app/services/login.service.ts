import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  readonly APIUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  // LOGIN

  login(val: any): Observable<any>{
    return this.http.post(this.APIUrl + '/user/login', val);
  }
}
