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
  notifyChangeVariable = false; // I'm not sure this is needed anymore, since we have workstationAction and roomAction that change
  // search
  searchId: string;
  searchUsername: string;
  // workstationModal
  addEditWorkstation = this.service.workstationTemplate;
  workstationAction = 'add'; // add or edit
  // roomModal
  addEditRoom = this.service.roomTemplate;
  roomAction = 'add'; // add or edit

  ngOnInit(): void {
    this.refreshAll();
  }

  getRoomInfoById(id): any {
    return this.roomsList.find( o => o.id === id );
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
    this.service.getRoomList().subscribe( (roomsData) => {
      this.roomsList = roomsData;
      this.service.getWorkstationList().subscribe((workstationsData) => {

        this.workstationsList = workstationsData;
        const tempRoomsMap = new Map<any, any>();

        // then I update the rooms map
        this.roomsMap = new Map<any, any>();

        // Put in the map all the rooms saved in the server, also the empty ones.
        // Do that just if there if there isn't a filter. When you filter you don't want to see the empty rooms.
        if ( filterWorkstationId == null ){
          for (const r of this.roomsList){
            tempRoomsMap.set(r.id, []);
          }
        }
        // I divide the workstations by their room
        // If there is a workstation with a roomid not present in roomList,
        // i add the workstation anyway, inside a new entry of the map
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
      }, error => alert('C\'è stato un errore'));
    });
    // then I update the workstation list

  }

  // deletes the workstation
  // tslint:disable-next-line:typedef
  deleteClick(item: { id: any; }) {
    if (confirm('Sei sicuro?')) {
      this.service.deleteWorkstation(item.id).toPromise().then((data) => {
        // here I will have to check if the server returned 'Deleted Successfully' (or something like that)
        alert(data.toString());
        this.refreshAll();
      });
    }
  }

  deleteRoom(roomId): void {
    console.log(roomId);

    if (confirm('Sei sicuro?')){
      this.service.deleteRoom(roomId.toString()).subscribe( (data) => {
        alert(data.toString());
        this.refreshAll();
      }, error => alert('C\'è stato un errore'));
    }
  }

  openAddWorkstation(idroom): void{
    this.addEditWorkstation = this.service.workstationTemplate;
    this.addEditWorkstation.idroom = idroom;
    this.workstationAction = 'add';
    this.notifyChange();
    console.log(this.addEditWorkstation);
  }

  openEditWorkstation(workstation): void{
    this.addEditWorkstation = workstation;
    this.workstationAction = 'edit';
    this.notifyChange();
  }

  openAddRoom(): void{
    this.addEditRoom = this.service.roomTemplate;
    this.roomAction = 'add';
    this.notifyChange();
  }

  openEditRoom(room): void{
    this.addEditRoom = room;
    this.roomAction = 'edit';
    this.notifyChange();
  }

  // changes a variable so that all the variables, of other components, binded to it change too.
  // This makes the other components notice changes, even on other variables.
  notifyChange(): void{
    this.notifyChangeVariable = !this.notifyChangeVariable;
  }

  closeAddEditWorkstation(): void {
    this.refreshAll();
  }

  closeAddEditRoom(): void {
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
