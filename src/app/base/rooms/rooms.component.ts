import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomsComponent implements OnInit {

  constructor(private service: SharedService, private cd: ChangeDetectorRef) {
  }

  roomsMap = new Map<any, any>();
  roomsList: any = [];
  workstationsList: any = [];
  editedaddedWorkstation: any;

  ngOnInit(): void {
    this.refreshAll();
  }


  refreshAll(): void {
    // First I update the room list
    this.service.getRoomList().toPromise().then(data => {
      this.roomsList = data;
      console.log('ciao1');
    }).then( () => {
      // then I update the workstation list
      this.service.getWorkstationList().toPromise().then(data => {
        this.workstationsList = data;
        console.log('ciao2');
        // then I update the rooms map
        this.roomsMap = new Map<any, any>();
        // I divide the workstations by their room
        // For now I don't check the correspondence with the roomsList
        this.workstationsList.forEach(function(value): void {
          if (this.roomsMap.get(value.idroom)) {
          } else {
            this.roomsMap.set(value.idroom, []);
          }
          this.roomsMap.get(value.idroom).push(value);
        }.bind(this));
        // says to angular to update the view
        this.cd.detectChanges();
      });
    });
  }

  testFunc(): void {
    console.log(this.roomsMap);

  }

  // tslint:disable-next-line:typedef
  deleteClick(item: { id: any; }) {
    if (confirm('Are you sure??')) {
      this.service.deleteWorkstation(item.id).subscribe(data => {
        alert(data.toString());
        this.refreshAll();
      });
    }
  }

  addWorkstationClick(): void {
    this.editedaddedWorkstation = {
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
