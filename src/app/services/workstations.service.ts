import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {WorkstationData} from '../models/workstation-data';

@Injectable({
  providedIn: 'root'
})
export class WorkstationsService {

  readonly APIUrl = 'http://dpcm2077.duckdns.org:8000';

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line
  getWorkstationList(): Observable<WorkstationData[]>{
    return this.http.get<WorkstationData[]>(this.APIUrl + '/workstation/list');
  }
  // tslint:disable-next-line
  addWorkstation(val: WorkstationData): Observable<string>{
    return this.http.post<string>(this.APIUrl + '/workstation/insert', val);
  }

  // tslint:disable-next-line
  deleteWorkstation(val: number){
    return this.http.get<string>(this.APIUrl + '/workstation/del/' + val);
  }

  modifyWorkstation(val: WorkstationData): Observable<string>{
    return this.http.post<string>(this.APIUrl + '/workstation/modify', val);
  }

}
