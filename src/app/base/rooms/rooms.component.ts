import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {RoomsService} from 'src/app/services/rooms.service';
import {WorkstationData} from '../../models/workstation-data';
import {RoomData, RoomDataWithDates} from '../../models/room-data';
import {WorkstationsService} from '../../services/workstations.service';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  constructor(private roomService: RoomsService, private workstationService: WorkstationsService) {
  }

  roomsMap = new Map<number, WorkstationData[]>();
  roomsList: RoomData[] = [];
  workstationsList: any = [];
  notifyChangeVariable = false; // I'm not sure this is needed anymore, since we have workstationAction and roomAction that change
  // workstationModal
  addEditWorkstation = new WorkstationData();
  workstationAction = 'add'; // add or edit
  // roomModal
  addEditRoom = new RoomData();
  roomAction = 'add'; // add or edit
  filterWorkstationName: string;
  filterRoomName: string;
  roomVisible = new Map<number, boolean>();

  ngOnInit(): void {
    this.refreshAll();
  }

  getRoomsMapKeys(): number[]{
    return Array.from(this.roomsMap.keys());
  }

  getRoomInfoById(id): RoomData {
    return this.roomsList.find( o => o.id === id );
  }

  getRoomInfoByName(name): any {
    return this.roomsList.find( o => o.roomname === name );
  }

  getWorkstationsListByRoomId(roomId): any {
    return this.roomsMap.get(roomId);
  }

  setRoomsList(roomsData: RoomData[]): void{
    this.roomsList = roomsData;
  }

  setWorkstationList(workstationsData: WorkstationData[]): void{
    this.workstationsList = workstationsData;
  }

  // this function accepts a filter
  async refreshAll(filterWorkstationName?: string, filterRoomName?: string): Promise<void> {
    // First update the room list and workstation list
    const prom1 = this.roomService.getRoomList().toPromise();
    const prom2 = this.workstationService.getWorkstationList().toPromise();
    const todo = [await prom1.then((data) => this.setRoomsList(data)),
      await prom2.then((data) => this.setWorkstationList(data))];
    await Promise.all(todo);

    this.populateRoomsMap(filterWorkstationName, filterRoomName);

  }

  populateRoomsMap(filterWorkstationName?: string, filterRoomName?: string): void{
    const tempRoomsMap = new Map<number, WorkstationData[]>();

    // then I update the rooms map
    this.roomsMap = new Map<number, WorkstationData[]>();

    if (filterWorkstationName == null && filterRoomName == null) {
      // non c'è alcun filtro
        for (const r of this.roomsList){
          tempRoomsMap.set(r.id, []);
        }
      // I divide the workstations by their room
      // If there is a workstation with a roomid not present in roomList,
      // i add the workstation anyway, inside a new entry of the map
        for (const w of this.workstationsList){
          if (!tempRoomsMap.get(w.idroom)) {
            tempRoomsMap.set(w.idroom, []);
          }
          tempRoomsMap.get(w.idroom).push(w);
      }
    }else if (filterWorkstationName != null) {
      // filtro postazione

      // I divide the workstations by their room
      // If there is a workstation with a roomid not present in roomList,
      // i add the workstation anyway, inside a new entry of the map
      for (const w of this.workstationsList){
        if (w.workstationname === filterWorkstationName) {
          if (!tempRoomsMap.get(w.idroom)) {
            tempRoomsMap.set(w.idroom, []);
          }
          tempRoomsMap.get(w.idroom).push(w);
        }
      }
    } else if (filterRoomName != null) {
      // filtro stanza
      for (const r of this.roomsList){
        if (r.roomname === filterRoomName) {
          tempRoomsMap.set(r.id, []);
        }
      }

      for (const w of this.workstationsList){
        if (tempRoomsMap.get(w.idroom)) {
          tempRoomsMap.get(w.idroom).push(w);
        }
      }
    }
    // Put in the map all the rooms saved in the server, also the empty ones.
    // Do that just if there isn't a filter. When you filter you don't want to see the empty rooms.

    this.roomsMap = tempRoomsMap;
    this.notifyChange();
  }

  // deletes the workstation
  // tslint:disable-next-line:typedef
  deleteClick(item: { id: any; }) {
    if (confirm('Sei sicuro?')) {
      this.workstationService.deleteWorkstation(item.id).toPromise().then((data) => {
        // here I will have to check if the server returned 'Deleted Successfully' (or something like that)
        alert(UtilsService.checkReturnType(data));
        this.refreshAll();
      });
    }
  }

  deleteRoom(roomId): void {

    if (confirm('Sei sicuro?')){
      this.roomService.deleteRoom(roomId.toString()).subscribe( (data) => {
        alert(UtilsService.checkReturnType(data));
        this.refreshAll();
      }, error => alert('C\'è stato un errore'));
    }
  }

  openAddWorkstation(idroom): void{
    this.addEditWorkstation = new WorkstationData();
    this.addEditWorkstation.idroom = idroom;
    this.workstationAction = 'add';
    this.notifyChange();
  }

  openEditWorkstation(workstation): void{
    this.addEditWorkstation = workstation;
    this.workstationAction = 'edit';
    this.notifyChange();
  }

  openAddRoom(): void{
    this.addEditRoom = new RoomData();
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
    this.notifyChange();
  }

  closeAddEditRoom(): void {
    this.refreshAll();
    this.notifyChange();
  }

  searchOccupation(): void {
    this.refreshAll(this.filterWorkstationName);
  }

  searchRoom(): void {
    this.refreshAll(null, this.filterRoomName);
  }

  resetFilter(): void {
    // I call the refresh all without specifing filter parameters
    this.refreshAll();
  }



  invertRoomVisibility(roomId: number): void {
    const old = this.roomVisible.get(roomId);
    this.roomVisible.set(roomId, !old);
  }

  getNumberOfOccupantsByRoomId(roomId: number): number{
    const roomsWorkstations = this.roomsMap.get(roomId);
    let occupantsNum = 0;
    if (roomsWorkstations) {
      for (const work of roomsWorkstations){
        if (work.state === 1) {
          occupantsNum += 1;
        }
      }
    }
    return occupantsNum;
  }

  getRoomsUnavailabilityDates(roomId: number): any {
    const room = this.getRoomInfoById(roomId);
    if (room.unavailable === 1){
      const obj = {
        failureFrom : UtilsService.convertDateAPIToHtml((room as RoomDataWithDates).failureFrom),
        failureTo : UtilsService.convertDateAPIToHtml((room as RoomDataWithDates).failureTo)
      };
      return obj;
    }
    return null;
  }



}
