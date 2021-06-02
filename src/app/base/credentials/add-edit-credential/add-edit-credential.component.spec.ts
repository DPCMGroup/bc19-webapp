import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCredentialComponent } from './add-edit-credential.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {ReportComponent} from '../../report/report.component';
import {ReportsService} from '../../../services/reports.service';
import {UserService} from '../../../services/user.service';

describe('AddEditCredentialComponent', () => {
  let component: AddEditCredentialComponent;
  let fixture: ComponentFixture<AddEditCredentialComponent>;
  let userServiceStub: any;

  beforeEach(async () => {
    userServiceStub = {
      getUserList: () => of(),
      addUser: () => of(),
      deleteUser: () => of(),
      modifyUser: () => of()
    };
    await TestBed.configureTestingModule({
      declarations: [ ReportComponent ],
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
});
