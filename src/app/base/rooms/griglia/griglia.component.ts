import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {WorkstationData} from '../../../models/workstation-data';
import {WorkstationsService} from '../../../services/workstations.service';
import {RoomData} from '../../../models/room-data';
import {RoomsService} from '../../../services/rooms.service';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-griglia',
  templateUrl: './griglia.component.html',
  styleUrls: ['./griglia.component.css']
})
export class GrigliaComponent implements OnInit, OnChanges{

  constructor(private workstationService: WorkstationsService, private roomService: RoomsService) { }

  workstationsList: WorkstationData[] = [];
  roomsList: RoomData[] = [];
  roomArray: boolean[][] = [];
  room: RoomData;
  @Input() roomId = 6;
  @Input() changeVariable = false;

  ngOnInit(): void {
    this.init();
  }

  ngOnChanges(): void {
    this.init();
  }


  async init(): Promise<void> {
    await this.workstationService.getWorkstationList().toPromise().then((data: WorkstationData[]) => {this.workstationsList = data; });

    await this.roomService.getRoomList().toPromise().then( (data: RoomData[]) => {this.roomsList = data; });
    // console.log(`this.roomsList:`);
    // console.log(this.roomsList);
    this.room = this.filterSingleRoom(this.roomsList, this.roomId);
    // console.log(`this.room:  ${this.room}`);
    // tslint:disable-next-line:max-line-length
    this.roomArray = this.workstationsToRoomGrid(this.filterWorkstationsByRoom(this.workstationsList, this.roomId), this.room.xroom, this.room.yroom);

    // console.log(this.workstationsList[0]);
  }

  filterWorkstationsByRoom(works: WorkstationData[], roomId: number): WorkstationData[] {
    const filteredWorks = works.filter( (w) => w.idroom === roomId ? true : false);

    return filteredWorks;
  }

  filterSingleRoom(rooms: RoomData[], roomid: number): RoomData {
    return rooms.filter( (r) => r.id === roomid ? true : false)[0];
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

  workstationsToRoomGrid(works: WorkstationData[], dimx: number, dimy: number): boolean[][] {
    const roomArr: boolean[][] = [];
    for (let i = 0; i < dimx; i += 1){
      roomArr.push([]);
      for (let j = 0; j < dimy; j += 1){
        // console.log(`${i} : ${j}`);
        if (this.filterWorkstationsByPosition(works, i, j)){
          // console.log('true');

          roomArr[i].push(true);
        }else{
          roomArr[i].push(false);
        }
      }
    }
    return roomArr;
  }




}
