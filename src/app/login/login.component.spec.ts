import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {LoginService} from '../services/login.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {LoginData} from '../models/login-data';
import {UserData} from '../models/user-data';
import {async, BehaviorSubject, Observable} from 'rxjs';

/*
class MockLoginService {
  APIUrl = '';
  http = null;
  login(val: LoginData): Observable<UserData> {
    const returnData = new UserData();
    returnData.type = 0;
    const behaviorSubject = new BehaviorSubject<UserData>(returnData);
    return behaviorSubject;
  }
}

 */

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let service: LoginService;
  let httpTestingController: HttpTestingController;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule ],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(LoginService);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set error hidden', () => {
    component.focused();
    expect(component.errorVisible).toBe('hidden');
  });

  it('error visible', () => {
    component.setErrorVisible(true);
    expect(component.errorVisible).toBe('visible');
  });

  it('error hidden', () => {
    component.setErrorVisible(false);
    expect(component.errorVisible).toBe('hidden');
  });

});
