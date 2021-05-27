import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RoomFailureData} from '../models/roomFailure-data';

@Injectable({
  providedIn: 'root'
})
export class RoomFailuresService {

  constructor(
    private http: HttpClient,
    @Inject('apiUrl') private APIUrl: string
  ) { }

  getFailuresList(): Observable<RoomFailureData[]>{
    return this.http.get<RoomFailureData[]>(this.APIUrl + '/room/failure/list');
  }

  addFailure(data: RoomFailureData): Observable<string>{
    return this.http.post<string>(this.APIUrl + '/room/failure/insert', data);
  }

  modifyFailure(data: RoomFailureData): Observable<string>{
    return this.http.post<string>(this.APIUrl + '/room/failure/modify', data);
  }

  deleteFailure(id: number): Observable<string>{
    return this.http.get<string>(this.APIUrl + '/room/failure/del/' + id);
  }

  deleteFailuresById(roomid: number): Observable<string>{
    return this.http.get<string>(this.APIUrl + '/room/failure/delall/' + roomid);
  }
}
