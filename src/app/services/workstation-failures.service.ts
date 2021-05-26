import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {WorkstationFailureData} from '../models/workstationFailure-data';

@Injectable({
  providedIn: 'root'
})
export class RoomFailuresService {

  constructor(
    private http: HttpClient,
    @Inject('apiUrl') private APIUrl: string
  ) { }

  getFailuresList(): Observable<WorkstationFailureData[]>{
    return this.http.get<WorkstationFailureData[]>(this.APIUrl + '/workstation/failure/list');
  }

  addFailure(data: WorkstationFailureData): Observable<string>{
    return this.http.post<string>(this.APIUrl + '/workstation/failure/insert', data);
  }

  modifyFailure(data: WorkstationFailureData): Observable<string>{
    return this.http.post<string>(this.APIUrl + '/workstation/failure/modify', data);
  }

  deleteFailure(id: number): Observable<string>{
    return this.http.get<string>(this.APIUrl + '/workstation/failure/del/' + id);
  }
}
