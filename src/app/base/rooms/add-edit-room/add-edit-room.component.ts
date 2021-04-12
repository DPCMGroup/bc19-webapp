import {Component, Input, OnInit} from '@angular/core';
import {SharedService} from '../../../shared.service';

@Component({
  selector: 'app-add-edit-room',
  templateUrl: './add-edit-room.component.html',
  styleUrls: ['./add-edit-room.component.css']
})
export class AddEditRoomComponent implements OnInit {

  constructor(private service: SharedService) { }

// {"id": 1, "roomname": "lab1", "xroom": 10, "yroom": 10, "archived": 0}
  id: number;
  roomname: string;
  xroom: string;
  yroom: string;
  archived: number;

  @Input() noticeChangeVariable: boolean;

  @Input() passedRoom: any;
  @Input() action: string;


  ngOnInit(): void {
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges(): void {
    console.log('changed');
    // assign passed room values into my values (just the values that need to be assigned)
    this.id = this.passedRoom.id;
    this.roomname = this.passedRoom.roomname;
    this.xroom = this.passedRoom.xroom;
    this.yroom = this.passedRoom.yroom;
    this.archived = this.passedRoom.archived;
  }

  getRoomFromLocalValues(): any{
    const newRoom = {
      id: this.id,
      roomname: this.roomname,
      xroom: parseInt(this.xroom, 10),
      yroom: parseInt(this.yroom, 10),
      archived: this.archived
    };
    return newRoom;
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
    this.service.addRoom(newRoom).subscribe( (data) => {
      alert(data.toString());
    }, error => alert('There was an error'));
  }

  editRoom(): void{
    const newRoom = this.getRoomFromLocalValues();
    console.log('editRoom ');
    console.log(newRoom);
    this.service.modifyRoom(newRoom).subscribe( (data) => {
      alert(data.toString());
    }, error => alert('There was an error'));

  }

}
