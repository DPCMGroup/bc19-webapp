import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {WorkstationData} from '../../../models/workstation-data';
import {RoomData} from '../../../models/room-data';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnChanges{

  constructor() { }

  // are passed already filtered for this room
  @Input() workstationsList: WorkstationData[] = [];
  roomArray: WorkstationData[][] = [];
  @Input() room: RoomData = null;
  @Input() changeVariable = false;

  @Output() newItemEvent = new EventEmitter<WorkstationData>();

  ngOnChanges(): void {
    this.init();
  }


  init(): void {
    this.roomArray = this.workstationsToRoomGrid(this.workstationsList, this.room.xroom, this.room.yroom);
  }

  filterWorkstationsByPosition(works: WorkstationData[], x: number, y: number): WorkstationData{
    for (const w of works){
      if ( w.xworkstation === x && w.yworkstation === y){
        return w;
      }
    }
    return null;
  }

  workstationsToRoomGrid(works: WorkstationData[], dimx: number, dimy: number): WorkstationData[][] {
    const roomArr: WorkstationData[][] = [];
    for (let i = 0; i < dimx; i += 1){
      roomArr.push([]);
      for (let j = 0; j < dimy; j += 1){
        const filteredWork = this.filterWorkstationsByPosition(works, i, j);
        if (filteredWork){
          roomArr[i].push(filteredWork);
        }else{
          roomArr[i].push(null);
        }
      }
    }
    return roomArr;
  }

  getArrayFromNum(n: number): number[] {
    const arr = new Array(n);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < arr.length; i++){
      arr[i] = i;
    }
    return arr;
  }

  receiveItem(item: WorkstationData): void {
    console.log('grid received item: ');
    console.log(item);
    this.newItemEvent.emit(item);
  }




}
