import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCredentialComponent } from './show-credential.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {UserService} from '../../../services/user.service';
import {of} from 'rxjs';
import {UserData} from '../../../models/user-data';

describe('ShowCredentialComponent', () => {
  let component: ShowCredentialComponent;
  let fixture: ComponentFixture<ShowCredentialComponent>;
  let userServiceStub: any;

  beforeEach(async () => {
    const userData = new UserData();
    userData.id = 5;
    userServiceStub = {
      getUserList: () => of([userData])
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ ShowCredentialComponent ],
      providers: [{provide: UserService, useValue: userServiceStub}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCredentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show createCredential button', () => {
    expect(document.getElementById('createCredentialButton')).toBeTruthy();
  });

  it('should show credentials', () => {
    expect(document.getElementsByTagName('tr').length).toBe(2);
    expect(document.getElementsByTagName('td')[0].innerHTML).toBe('5');
  });

  it('should convert type number properly', () => {
    expect(component.typeNumToString(0)).toBe('Amministratore');
    expect(component.typeNumToString(1)).toBe('Dipendente');
    expect(component.typeNumToString(2)).toBe('Addetto');
  });

  it('should convert active/disabled number properly', () => {
    expect(component.typeNumToString1(0)).toBe('Abilitato');
    expect(component.typeNumToString1(1)).toBe('Non Abilitato');
  });

  it('should set credentials list properly', () => {
    component.CredentialList = [];
    const data = new UserData();
    component.setCredentialsList([data]);
    expect(component.CredentialList.length).toBe(1);
    expect(component.CredentialList[0]).toBe(data);
  });

  it('should addClick properly', () => {
    component.addClick();
    expect(component.userAction).toBe('add');
    expect(component.addEditCredential).toEqual(new UserData());
  });

  it('should editClick properly', () => {
    const cred = new UserData();
    component.editClick(cred);
    expect(component.userAction).toBe('edit');
    expect(component.addEditCredential).toEqual(cred);
  });

});
