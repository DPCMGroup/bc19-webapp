import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  constructor(private service: SharedService) { }
  roomsList: any;
  roomsMap;
  workstationsList: any;

  ngOnInit(): void {
    this.refreshWorkstationList();
  }

  refreshWorkstationList(): void{
    this.service.getWorkstationList().subscribe(data => {
      let tempWorkstationsList: any = [];
      tempWorkstationsList = data;
      let tempRoomsMap: Map<any, any>;
      tempRoomsMap = new Map<any, any>();
      // I divide the workstations by their room
      tempWorkstationsList.forEach( function( value ): void{
        console.log(value);
        if ( tempRoomsMap.get(value.idroom) ){
        }else{
          tempRoomsMap.set(value.idroom, []);
        }
        tempRoomsMap.get(value.idroom).push(value);
      }.bind(this));
      this.workstationsList = tempWorkstationsList;
      this.roomsMap = tempRoomsMap;

    });
  }

  testFunc(): void{
    console.log(this.roomsMap);
  }

}
