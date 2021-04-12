import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  // use as a reference for the values that the service expects
  workstationTemplate = {
    id: '',
    tag: '',
    workstationname: '',
    xworkstation: '',
    yworkstation: '',
    idroom: '',
    state: '',
    sanitized: '',
    archived: ''
  };

  roomTemplate = {
    id: '',
    roomname: '',
    xroom: '',
    yroom: '',
    archived: ''
  };

  userTemplate = {
    id: '',
    username: '',
    password: '',
    name: '',
    surname: '',
    mail: '',
    type: '',
    archived: ''
  };

  //  WORKSTATIONS

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

  // LOGIN

  login(val: any): Observable<any>{
    return this.http.post(this.APIUrl + '/user/login', val);
  }

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
