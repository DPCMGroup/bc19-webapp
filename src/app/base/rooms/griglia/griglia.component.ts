import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {WorkstationData} from '../../../models/workstation-data';
import {WorkstationsService} from '../../../services/workstations.service';
import {RoomData} from '../../../models/room-data';
import {RoomsService} from '../../../services/rooms.service';

@Component({
  selector: 'app-griglia',
  templateUrl: './griglia.component.html',
  styleUrls: ['./griglia.component.css']
})
export class GrigliaComponent implements OnInit, OnChanges{

  constructor(private workstationService: WorkstationsService, private roomService: RoomsService) { }

  // are passed already filtered for this room
  @Input() workstationsList: WorkstationData[] = [];
  roomArray: WorkstationData[][] = [];
  @Input() room: RoomData = null;
  @Input() changeVariable = false;

  @Output() newItemEvent = new EventEmitter<WorkstationData>();

  ngOnInit(): void {
    // this.init();
  }

  ngOnChanges(): void {
    this.init();
  }


  async init(): Promise<void> {
    console.log('griglia init');
    // console.log(this.workstationsList);
    // tslint:disable-next-line:max-line-length
    this.roomArray = this.workstationsToRoomGrid(this.workstationsList, this.room.xroom, this.room.yroom);

    // console.log(this.workstationsList[0]);
  }

  filterWorkstationsByPosition(works: WorkstationData[], x: number, y: number): WorkstationData{
    // console.log(`${x} : ${y}`);
    // console.log(works.length);


    const filteredWorks: WorkstationData[] = [];
    for (const w of works){
      if ( w.xworkstation === x && w.yworkstation === y){
        filteredWorks.push(w);
      }
    }

    if (filteredWorks.length > 0){
      return filteredWorks[0];
    }else{
      return null;
    }
  }

  workstationsToRoomGrid(works: WorkstationData[], dimx: number, dimy: number): WorkstationData[][] {
    const roomArr: WorkstationData[][] = [];
    for (let i = 0; i < dimx; i += 1){
      roomArr.push([]);
      for (let j = 0; j < dimy; j += 1){
        // console.log(`${i} : ${j}`);
        const filteredWork = this.filterWorkstationsByPosition(works, i, j);
        if (filteredWork){
          // console.log('true');

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
    console.log('griglia received item: ');
    console.log(item);
    this.newItemEvent.emit(item);
  }




}
