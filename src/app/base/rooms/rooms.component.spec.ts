import { ComponentFixture, TestBed} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RoomsComponent } from './rooms.component';
import {of} from 'rxjs';
import {ReportComponent} from '../report/report.component';
import {UserService} from '../../services/user.service';
import {RoomsService} from '../../services/rooms.service';
import {WorkstationsService} from '../../services/workstations.service';

describe('RoomsComponent', () => {
  let component: RoomsComponent;
  let fixture: ComponentFixture<RoomsComponent>;
  let roomsServiceStub: any;
  let workstationsServiceStub: any;

  beforeEach(async () => {
    roomsServiceStub = {
      getRoomList: () => of(),
      addRoom: () => of(),
      deleteRoom: () => of(),
      modifyRoom: () => of()
    };
    workstationsServiceStub = {
      getWorkstationList: () => of(),
      addWorkstation: () => of(),
      deleteWorkstation: () => of(),
      modifyWorkstation: () => of()
    };
    await TestBed.configureTestingModule({
      declarations: [ ReportComponent ],
      providers: [{provide: RoomsService, useValue: roomsServiceStub},
        {provide: WorkstationsService, useValue: workstationsServiceStub}]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
