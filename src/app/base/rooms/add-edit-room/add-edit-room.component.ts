import {Component, Input, OnInit} from '@angular/core';
import {RoomsService} from '../../../services/rooms.service';
import {UtilsService} from '../../../services/utils.service';
import {RoomData, RoomDataWithDates} from '../../../models/room-data';
import {RoomFailureData} from '../../../models/roomFailure-data';
import {RoomFailuresService} from '../../../services/room-failures.service';

@Component({
  selector: 'app-add-edit-room',
  templateUrl: './add-edit-room.component.html',
  styleUrls: ['./add-edit-room.component.css']
})
export class AddEditRoomComponent {

  constructor(private service: RoomsService, private roomFailuresService: RoomFailuresService) { }

// {"id": 1, "roomname": "lab1", "xroom": 10, "yroom": 10, "archived": 0}
  id: number;
  roomname: string;
  xroom: string;
  yroom: string;
  archived: number;
  unavailable: boolean;
  startDate: string;
  endDate: string;

  @Input() noticeChangeVariable: boolean;

  @Input() passedRoom: any;
  @Input() action: string;

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges(): void {
    console.log('passedRoom');
    console.log(this.passedRoom);
    // console.log('changed');
    // assign passed room values into my values (just the values that need to be assigned)
    this.id = this.passedRoom.id;
    this.roomname = this.passedRoom.roomname;
    this.xroom = this.passedRoom.xroom;
    this.yroom = this.passedRoom.yroom;
    this.archived = this.passedRoom.archived;
    this.unavailable = this.passedRoom.unavailable === 1 ? true : false;
    if (this.passedRoom.unavailable === 1){
      const passedRoomWithDates = this.passedRoom as RoomDataWithDates;
      this.startDate = UtilsService.convertDateAPIToHtml(passedRoomWithDates.failureFrom);
      this.endDate = UtilsService.convertDateAPIToHtml(passedRoomWithDates.failureTo);
    }else{
      const currentDate = new Date().toLocaleDateString();
      const parts = currentDate.split('/');
      for (let i = 0; i < parts.length; i++){
        parts[i] = parts[i].length === 1 ? '0' + parts[i] : parts[i];
      }
      const newDate = parts[2] + '-' + parts[0] + '-' + parts[1];
      console.log(newDate);
      this.startDate = newDate;
      this.endDate = '2030-01-01';
    }
  }

  getRoomFromLocalValues(): RoomData{
    const newRoom: RoomData = {
      id: this.id,
      roomname: this.roomname,
      xroom: parseInt(this.xroom, 10),
      yroom: parseInt(this.yroom, 10),
      archived: this.archived,
      unavailable: this.unavailable === true ? 1 : 0
    };
    return newRoom;
  }

  getRoomFailureFromLocalValues(): RoomFailureData {
    if (this.unavailable === true) {
      const newFailure: RoomFailureData = {
        idroom: this.id,
        starttime: this.startDate + ' 00:00:00',
        endtime: this.endDate + ' 00:00:00'
      };
      return newFailure;
    }else{
      return null;
    }
  }

  takeAction(): void{
    if (this.action === 'add'){
      this.addRoom();
    }else if (this.action === 'edit'){
      this.editRoom();
    }
  }


  addRoom(): void{
    const newRoom = this.getRoomFromLocalValues();
    // set values that may be not already set or set improperly but that the server requires
    newRoom.id = 0;
    newRoom.archived = 0;
    // console.log(newRoom);
    this.service.addRoom(newRoom).subscribe( (data) => {
      alert(UtilsService.checkReturnType(data));
    }, error => alert('C\'è stato un errore'));
  }

  async editRoom(): Promise<void>{
    const newRoom = this.getRoomFromLocalValues();
    const newFailure = this.getRoomFailureFromLocalValues();
    console.log('unavailable: ' + this.unavailable);
    if (newFailure !== null) {
      this.roomFailuresService.deleteFailuresById(this.id).subscribe( (data) => {
        alert(data);
        this.roomFailuresService.addFailure(newFailure).subscribe( (data2) => {
          alert(data2);
          this.service.modifyRoom(newRoom).subscribe( (data3) => {
            alert( UtilsService.checkReturnType(data3));
          });
        });
      });
      console.log('sending room failure');
      console.log(newFailure);
    }else{
      this.roomFailuresService.deleteFailuresById(this.id).subscribe( (data) => {
        alert(data);
        this.service.modifyRoom(newRoom).subscribe( (data2) => {
          alert( UtilsService.checkReturnType(data2));
        });
      });
    }

  }

}
