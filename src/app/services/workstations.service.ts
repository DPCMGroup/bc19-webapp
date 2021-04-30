import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkstationsService {

  readonly APIUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line
  getWorkstationList(){
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

  modifyWorkstation(val: any): Observable<any>{
    return this.http.post(this.APIUrl + '/workstation/modify', val);
  }

}
