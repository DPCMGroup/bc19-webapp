import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRoomComponent } from './add-edit-room.component';
import {RoomsService} from '../../../services/rooms.service';
import {RoomFailuresService} from '../../../services/room-failures.service';
import {UtilsService} from '../../../services/utils.service';
import {of} from 'rxjs';

describe('AddEditRoomComponent', () => {
  let component: AddEditRoomComponent;
  let fixture: ComponentFixture<AddEditRoomComponent>;
  let roomsServiceStub: any;
  let roomFailuresServiceStub: any;

  beforeEach(async () => {
    roomsServiceStub = {
      addRoom: (newRoom) => of('10')
    };
    roomFailuresServiceStub = {
      addFailure: (newFail) => of('10')
    };
    await TestBed.configureTestingModule({
      declarations: [ AddEditRoomComponent ],
      providers: [{provide: RoomsService, useValue: roomsServiceStub}, {provide: RoomFailuresService, useValue: roomFailuresServiceStub}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get room from local values', () => {
    component.roomname = 'name';
    component.xroom = '0';
    component.yroom = '1';
    component.archived = 0;
    component.unavailable = false;
    const room = component.getRoomFromLocalValues();
    expect(room.roomname).toBe('name');
    expect(room.xroom).toBe(0);
    expect(room.yroom).toBe(1);
    expect(room.archived).toBe(0);
    expect(room.unavailable).toBe(0);
  });

  it('should get room failure from local values if unavailable', () => {
    component.unavailable = true;
    component.id = 0;
    component.startDate = '2021-01-01';
    component.endDate = '2030-01-01';
    const roomFail = component.getRoomFailureFromLocalValues();
    expect(roomFail).toBeTruthy();
    expect(roomFail.idroom).toBe(0);
    expect(roomFail.starttime).toBe('2021-01-01 00:00:00');
    expect(roomFail.endtime).toBe('2030-01-01 00:00:00');
  });

  it('should not get room failure from local values if not unavailable', () => {
    component.unavailable = false;
    const roomFail = component.getRoomFailureFromLocalValues();
    expect(roomFail).toBeFalsy();
  });

  it('should call addRoom', () => {
    spyOn(component, 'addRoom');
    component.action = 'add';
    component.takeAction();
    expect(component.addRoom).toHaveBeenCalled();
  });

  it('should call editRoom', () => {
    spyOn(component, 'editRoom');
    component.action = 'edit';
    component.takeAction();
    expect(component.editRoom).toHaveBeenCalled();
  });

  /*
  it('addRoom', () => {
    spyOn(roomsServiceStub, 'addRoom');
    component.addRoom();
    expect(roomsServiceStub.addRoom).toHaveBeenCalled();
  });*/


  /*it('should show unavailability fields', () => {
    component.action = 'edit';
    component.unavailable = true;
    fixture.detectChanges();
    document.getElementById('openAddEditRoomModal').click();
    expect(document.getElementById('roomUnavailabilityFields')).toBeTruthy();
  });*/

});
