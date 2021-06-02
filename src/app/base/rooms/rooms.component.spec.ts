import { ComponentFixture, TestBed} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RoomsComponent } from './rooms.component';
import {of} from 'rxjs';
import {ReportComponent} from '../report/report.component';
import {UserService} from '../../services/user.service';
import {RoomsService} from '../../services/rooms.service';
import {WorkstationsService} from '../../services/workstations.service';
import {RoomData} from '../../models/room-data';
import {WorkstationData} from '../../models/workstation-data';

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

  it('should populate properly without filters', () => {
    const room1 = new RoomData();
    room1.id = 0;
    const work1 = new WorkstationData();
    work1.id = 1;
    work1.idroom = 0;
    const work2 = new WorkstationData();
    work2.id = 2;
    work2.idroom = 1;
    component.roomsList = [room1];
    component.workstationsList = [work1, work2];
    const expectedMap = new Map<number, WorkstationData[]>();
    expectedMap.set(room1.id, [work1]);
    expectedMap.set(1, [work2]);

    component.populateRoomsMap();
    expect(component.roomsMap).toEqual(expectedMap);
  });

  it('should populate properly with workstation name filter', () => {
    const room1 = new RoomData();
    room1.id = 0;
    const work1 = new WorkstationData();
    work1.id = 1;
    work1.idroom = 0;
    work1.workstationname = 'name1';

    const work2 = new WorkstationData();
    work2.id = 2;
    work2.idroom = 0;
    work2.workstationname = 'name2';
    component.roomsList = [room1];
    component.workstationsList = [work1];

    component.roomsList = [room1];
    component.workstationsList = [work1, work2];

    const expectedMap = new Map<number, WorkstationData[]>();
    expectedMap.set(room1.id, [work1]);

    component.populateRoomsMap('name1');
    expect(component.roomsMap).toEqual(expectedMap);
  });

  it('should populate properly with room name filter', () => {
    const room1 = new RoomData();
    room1.id = 0;
    room1.roomname = 'name1';
    const room2 = new RoomData();
    room2.id = 1;
    room2.roomname = 'name2';
    const work1 = new WorkstationData();
    work1.id = 1;
    work1.idroom = 0;
    const work2 = new WorkstationData();
    work2.id = 2;
    work2.idroom = 1;

    component.roomsList = [room1, room2];
    component.workstationsList = [work1, work2];

    const expectedMap = new Map<number, WorkstationData[]>();
    expectedMap.set(room2.id, [work2]);

    component.populateRoomsMap(null, 'name2');
    expect(component.roomsMap).toEqual(expectedMap);
  });

  it('should return room info by id', () => {
    const room1 = new RoomData();
    room1.id = 0;
    const room2 = new RoomData();
    room2.id = 5;
    const room3 = new RoomData();
    room3.id = 9;

    component.roomsList = [room1, room2, room3];

    expect(component.getRoomInfoById(0)).toEqual(room1);
    expect(component.getRoomInfoById(5)).toEqual(room2);
    expect(component.getRoomInfoById(9)).toEqual(room3);
    expect(component.getRoomInfoById(1)).toEqual(undefined);
  });

  it('should return room info by name', () => {
    const room1 = new RoomData();
    room1.roomname = 'name1';
    const room2 = new RoomData();
    room2.roomname = 'name2';
    const room3 = new RoomData();
    room3.roomname = 'name3';

    component.roomsList = [room1, room2, room3];

    expect(component.getRoomInfoByName('name1')).toEqual(room1);
    expect(component.getRoomInfoByName('name2')).toEqual(room2);
    expect(component.getRoomInfoByName('name3')).toEqual(room3);
    expect(component.getRoomInfoByName('')).toEqual(undefined);
  });

  it('should return workstations by room id', () => {
    const room1 = new RoomData();
    room1.id = 0;
    const room2 = new RoomData();
    room2.id = 5;
    const room3 = new RoomData();
    room3.id = 9;

    const work1 = new WorkstationData();
    work1.id = 10;
    work1.idroom = 0;
    const work2 = new WorkstationData();
    work2.id = 11;
    work2.idroom = 5;
    const work3 = new WorkstationData();
    work3.id = 12;
    work3.idroom = 9;

    component.roomsMap = new Map<number, WorkstationData[]>();
    component.roomsMap.set(room1.id, [work1, work2]);
    component.roomsMap.set(room2.id, [work3]);
    component.roomsMap.set(room3.id, []);

    expect(component.getWorkstationsListByRoomId(room1.id)).toEqual([work1, work2]);
    expect(component.getWorkstationsListByRoomId(room2.id)).toEqual([work3]);
    expect(component.getWorkstationsListByRoomId(room3.id)).toEqual([]);
    expect(component.getWorkstationsListByRoomId(111)).toEqual(undefined);
  });

  it('should get occupants number right', () => {
    const room1 = new RoomData();
    room1.id = 0;
    const room2 = new RoomData();
    room2.id = 1;
    const room3 = new RoomData();
    room3.id = 2;

    const work1 = new WorkstationData();
    work1.id = 10;
    work1.idroom = 0;
    work1.state = 1;
    const work2 = new WorkstationData();
    work2.id = 11;
    work2.idroom = 5;
    work2.state = 2;
    const work3 = new WorkstationData();
    work3.id = 12;
    work3.idroom = 9;
    work3.state = 1;

    component.roomsMap = new Map<number, WorkstationData[]>();
    component.roomsMap.set(room1.id, [work1, work2]);
    component.roomsMap.set(room2.id, [work3]);
    component.roomsMap.set(room3.id, []);

    expect(component.getNumberOfOccupantsByRoomId(0)).toBe(1);
    expect(component.getNumberOfOccupantsByRoomId(1)).toBe(1);
    expect(component.getNumberOfOccupantsByRoomId(2)).toBe(0);
    expect(component.getNumberOfOccupantsByRoomId(111)).toBe(0);
  });

  it('should open add workstation', () => {
    component.openAddWorkstation(5);
    const expectedWork = new WorkstationData();
    expectedWork.idroom = 5;
    expect(component.addEditWorkstation).toEqual(expectedWork);
    expect(component.workstationAction).toBe('add');
  });

  it('should open add room', () => {
    component.openAddRoom();
    const expectedRoom = new RoomData();
    expect(component.addEditRoom).toEqual(expectedRoom);
    expect(component.roomAction).toBe('add');
  });

});
