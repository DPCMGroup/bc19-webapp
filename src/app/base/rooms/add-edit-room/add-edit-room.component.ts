import { Component, OnInit } from '@angular/core';
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
  xroom: number;
  yroom: number;


  ngOnInit(): void {
  }

  addRoom(): void{
    const newRoom = {
      roomname: this.roomname,
      xroom: this.xroom,
      yroom: this.yroom,
      archived: 0
    };
    this.service.addRoom(newRoom).subscribe( (data) => {
      alert(data.toString());
    });

  }

}
