import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCredentialComponent } from './add-edit-credential.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {ReportComponent} from '../../report/report.component';
import {ReportsService} from '../../../services/reports.service';
import {UserService} from '../../../services/user.service';
import {UserData} from '../../../models/user-data';

describe('AddEditCredentialComponent', () => {
  let component: AddEditCredentialComponent;
  let fixture: ComponentFixture<AddEditCredentialComponent>;
  let userServiceStub: any;

  beforeEach(async () => {
    userServiceStub = {
      getUserList: () => of('10'),
      addUser: () => of('10'),
      deleteUser: () => of('10'),
      modifyUser: () => of('10')
    };
    await TestBed.configureTestingModule({
      declarations: [ AddEditCredentialComponent ],
      providers: [{provide: UserService, useValue: userServiceStub}]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCredentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should take action add properly', () => {
    spyOn(component, 'addCredential');
    spyOn(component, 'editCredential');
    component.action = 'add';
    component.takeAction();
    expect(component.addCredential).toHaveBeenCalledOnceWith();
    expect(component.editCredential).not.toHaveBeenCalled();
  });

  it('should take action edit properly', () => {
    spyOn(component, 'addCredential');
    spyOn(component, 'editCredential');
    component.action = 'edit';
    component.takeAction();
    expect(component.addCredential).not.toHaveBeenCalled();
    expect(component.editCredential).toHaveBeenCalledOnceWith();
  });

  it('should copy values properly', () => {
    const cred = new UserData();
    cred.id = 0;
    cred.username = 'us1';
    cred.password = '';
    cred.name = '';
    cred.surname = '';
    cred.mail = '';
    cred.type = 0;
    cred.archived = 0;
    component.credential = cred;
    component.copyValues();
    expect(component.id).toBe(0);
    expect(component.username).toBe('us1');
    expect(component.password).toBe('');
    expect(component.name).toBe('');
    expect(component.surname).toBe('');
    expect(component.mail).toBe('');
    expect(component.type).toBe(0);
    expect(component.archived).toBe(0);
  });

  it('should copy values on changes', () => {
    spyOn(component, 'copyValues');
    component.ngOnChanges();
    expect(component.copyValues).toHaveBeenCalledOnceWith();
  });

  /*
  it('should add credential', () => {
    spyOn(userServiceStub, 'addUser');
    const cred1 = new UserData();
    component.credential = cred1;
    component.ngOnChanges();
    component.addCredential();
    expect(userServiceStub.addUser).toHaveBeenCalled();
  });*/
});
