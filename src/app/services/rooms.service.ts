import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {RoomData} from '../models/room-data';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  // readonly APIUrl = 'http://dpcm2077.duckdns.org:8000';

  constructor(private http: HttpClient,
              @Inject('apiUrl') private APIUrl: string) { }

  // ROOMS

  getRoomList(): Observable<RoomData[]>{
    return this.http.get<RoomData[]>(this.APIUrl + '/room/list');
  }

  addRoom(val: RoomData): Observable<string>{
    return this.http.post<string>(this.APIUrl + '/room/insert', val);
  }

  deleteRoom(val: number): Observable<string>{
    return this.http.get<string>(this.APIUrl + '/room/del/' + val);
  }

  modifyRoom(val: RoomData): Observable<string>{
    return this.http.post<string>(this.APIUrl + '/room/modify', val);
  }
}
