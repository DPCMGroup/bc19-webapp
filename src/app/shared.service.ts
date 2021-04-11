import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }
  getWorkstationList(): Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/workstation/list');
  }
  // tslint:disable-next-line
  addWorkstation(val: any){
    return this.http.post(this.APIUrl + '/workstation/insert', val);
  }

  // tslint:disable-next-line
  deleteWorkstation(val: any){
    return this.http.get(this.APIUrl + '/workstation/del/' + val);
  }
}
