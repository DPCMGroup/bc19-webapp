import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  readonly APIUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  // ROOMS

  getRoomList(): Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/room/list');
  }

  addRoom(val: any): Observable<any>{
    return this.http.post(this.APIUrl + '/room/insert', val);
  }

  deleteRoom(val: any): Observable<any>{
    return this.http.get(this.APIUrl + '/room/del/' + val);
  }

  modifyRoom(val: any): Observable<any>{
    return this.http.post(this.APIUrl + '/room/modify', val);
  }
}
