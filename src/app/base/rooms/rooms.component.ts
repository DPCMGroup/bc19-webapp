import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomsComponent implements OnInit {

  constructor(private service: SharedService, private cd: ChangeDetectorRef) { }
  roomsMap = new Map<any, any>();
  workstationsList: any = [];
  workstation: any;

  ngOnInit(): void {
    this.refreshWorkstationList();
  }

  refreshWorkstationList(): void{

    this.service.getWorkstationList().subscribe(data => {

      // let tempWorkstationsList: any = [];
      this.workstationsList = data;
      // let tempRoomsMap: Map<any, any>;
      this.roomsMap = new Map<any, any>();
      // I divide the workstations by their room
      // tslint:disable-next-line:only-arrow-functions
      this.workstationsList.forEach( function( value ): void{
        // console.log(value);
        if ( this.roomsMap.get(value.idroom) ){
        }else{
          this.roomsMap.set(value.idroom, []);
        }
        this.roomsMap.get(value.idroom).push(value);
      }.bind(this));
      // this.workstationsList = tempWorkstationsList;
      // this.roomsMap = tempRoomsMap;
      // detects changes just when it finished updating the
      this.cd.detectChanges();
    });
  }

  testFunc(): void{
    console.log(this.roomsMap);

  }

  // tslint:disable-next-line:typedef
  deleteClick(item: { id: any; }){
    if (confirm('Are you sure??')){
      this.service.deleteWorkstation(item.id).subscribe(data => {
        alert(data.toString());
        this.refreshWorkstationList();
      });
    }
  }

  addWorkstationClick(): void{
    this.workstation = {
      id: 0,
      workstationname: 'post1',
      xworkstation: 1,
      yworkstation: 1,
      idroom: 0,
      state: 0,
      archived: 0
    };
  }

}
