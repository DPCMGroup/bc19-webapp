import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridComponent } from './grid.component';
import {WorkstationData} from '../../../models/workstation-data';
import {RoomData} from '../../../models/room-data';

describe('GrigliaComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get array from num', () => {
    expect(component.getArrayFromNum(3)).toEqual([0, 1, 2]);
  });

  it('should receive item and pass it on', () => {
    spyOn(component.newItemEvent, 'emit');
    component.receiveItem(new WorkstationData());
    expect(component.newItemEvent.emit).toHaveBeenCalledOnceWith(new WorkstationData());
  });

  it('should call init on ngOnChanges', () => {
    spyOn(component, 'init');
    component.ngOnChanges();
    expect(component.init).toHaveBeenCalled();
  });

  it('should filter workstations by position', () => {
    const work1 = new WorkstationData();
    work1.xworkstation = 3;
    work1.yworkstation = 7;
    const works = [work1];
    expect(component.filterWorkstationsByPosition(works, 3, 7)).toEqual(work1);
    expect(component.filterWorkstationsByPosition(works, 3, 8)).toEqual(null);
  });

  it('should create grid from workstations properly', () => {
    const work1 = new WorkstationData();
    work1.xworkstation = 1;
    work1.yworkstation = 2;
    const  works1 = [work1];
    const work2 = new WorkstationData();
    work2.xworkstation = 4;
    work2.yworkstation = 3;
    const  works2 = [work2];
    expect(component.workstationsToRoomGrid(works1, 3, 3))
      .toEqual([[null, null, null], [null, null, work1], [null, null, null]]);
    expect(component.workstationsToRoomGrid(works2, 2, 3))
      .toEqual([[null, null, null], [null, null, null]]);
  });

  it('sould setup roomArray on init call', () => {
    spyOn(component, 'workstationsToRoomGrid');
    const work1 = new WorkstationData();
    component.workstationsList = [work1];
    component.room = new RoomData();
    component.room.xroom = 3;
    component.room.yroom = 3;
    component.init();
    expect(component.workstationsToRoomGrid).toHaveBeenCalledOnceWith([work1], 3, 3);
  });
});
