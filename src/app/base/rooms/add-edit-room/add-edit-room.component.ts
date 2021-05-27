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
export class AddEditRoomComponent implements OnInit {

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


  ngOnInit(): void {
  }

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
    }
  }

  getRoomFromLocalValues(): any{
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

  getRoomFailureFromLocalValues(): any {
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

  editRoom(): void{
    const newRoom = this.getRoomFromLocalValues();
    const newFailure = this.getRoomFailureFromLocalValues();
    this.service.modifyRoom(newRoom).subscribe( (data) => {
      alert( UtilsService.checkReturnType(data));
    }, error => alert('C\'è stato un errore'));

    console.log('unavailable: ' + this.unavailable);
    if (newFailure !== null) {
      this.roomFailuresService.deleteFailuresById(this.id).subscribe( (data) => {
        alert(data);
      });
      console.log('sending room failure');
      console.log(newFailure);
      this.roomFailuresService.addFailure(newFailure).subscribe( (data) => {
        alert(data);
      }, error => alert('C\'è stato un errore'));
    }else{
      this.roomFailuresService.deleteFailuresById(this.id).subscribe( (data) => {
        alert(data);
      });
    }

  }

}
