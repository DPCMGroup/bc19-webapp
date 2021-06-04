import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {LoginService} from '../services/login.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {LoginData} from '../models/login-data';
import {UserData} from '../models/user-data';
import {async, BehaviorSubject, Observable, of} from 'rxjs';
import {NgModule} from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let serviceStub: any;
  let fixture: ComponentFixture<LoginComponent>;


  beforeEach(async () => {
    serviceStub = {
      login: () => of('10')
    };
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [ {provide: LoginService, useValue: serviceStub}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    const de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set errors hidden on focus', () => {
    component.focused();
    expect(component.errorVisible).toBe('hidden');
    expect(component.errorVisible1).toBe('hidden');
  });

  it('should set error visible', () => {
    component.setErrorVisible(true);
    expect(component.errorVisible).toBe('visible');
  });

  it('should set error1 visible', () => {
    component.setErrorVisible_(true);
    expect(component.errorVisible1).toBe('visible');
  });

  it('should set error hidden', () => {
    component.setErrorVisible(false);
    expect(component.errorVisible).toBe('hidden');
  });

  it('should set error1 hidden', () => {
    component.setErrorVisible_(false);
    expect(component.errorVisible1).toBe('hidden');
  });

});
