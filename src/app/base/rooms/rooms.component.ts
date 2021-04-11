import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {SharedService} from 'src/app/shared.service';
import {AddEditWorkstationComponent} from './add-edit-workstation/add-edit-workstation.component';

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
  visible = new Map<any, boolean>();
  // search
  searchId: string;
  searchUsername: string;

  ngOnInit(): void {
    this.refreshAll();
  }


  refreshAllNoDB(): void {
    this.workstationsList = [
      {
        id: 8,
        tag: '00 12 10 01 8d 91 04',
        workstationname: 'lab1-ciao3',
        xworkstation: 6,
        yworkstation: 6,
        idroom: 55,
        state: 0,
        archived: 0
      },
      {
        id: 6,
        tag: '00 55 10 66 8d 91 04',
        workstationname: 'lab1-ciao3',
        xworkstation: 6,
        yworkstation: 6,
        idroom: 125,
        state: 0,
        archived: 0
      }
    ];

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

    console.log(this.roomsMap.keys());


  }

  // this function accepts a filter
  refreshAll(filterWorkstationId?): void {
    // First I update the room list

    // then I update the workstation list
    this.service.getWorkstationList().subscribe(data => {

      this.workstationsList = data;
      const tempRoomsMap = new Map<any, any>();
      console.log('ciao2');
      // then I update the rooms map
      this.roomsMap = new Map<any, any>();
      // I divide the workstations by their room
      // For now I don't check the correspondence with the roomsList
      for (const w of this.workstationsList){
        if (filterWorkstationId == null || w.id === filterWorkstationId) {
          if (tempRoomsMap.get(w.idroom)) {
          } else {
            tempRoomsMap.set(w.idroom, []);
          }
          tempRoomsMap.get(w.idroom).push(w);
        }
      }
      this.roomsMap = tempRoomsMap;
      // says to angular to update the view
      this.cd.detectChanges();
      console.log('refreshed all');
    });
  }

  // tslint:disable-next-line:typedef
  deleteClick(item: { id: any; }) {
    if (confirm('Are you sure??')) {
      this.service.deleteWorkstation(item.id).toPromise().then((data) => {
        // here I will have to check if the server returned 'Deleted Successfully' (or something like that)
        alert(data.toString());
        this.refreshAll();
      });
    }
  }

  closeAddWorkstation(): void {
    this.refreshAll();
  }

  searchOccupation(): void {
    // leggi WorkstationId: string;
    // e Username: string;
    // Poi user this.filer
    this.refreshAll( parseInt(this.searchId, 10));
  }

  resetFilter(): void {
    // I call the refresh all without specifing filter parameters
    this.refreshAll();
  }

}
