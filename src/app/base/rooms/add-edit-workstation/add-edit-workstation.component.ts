import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { WorkstationsService } from '../../../services/workstations.service';
import {WorkstationData, WorkstationDataWithDates} from '../../../models/workstation-data';
import {UtilsService} from '../../../services/utils.service';
import {WorkstationFailureData} from '../../../models/workstationFailure-data';
import {WorkstationFailuresService} from '../../../services/workstation-failures.service';
import {RoomDataWithDates} from '../../../models/room-data';

@Component({
  selector: 'app-add-edit-workstation',
  templateUrl: './add-edit-workstation.component.html',
  styleUrls: ['./add-edit-workstation.component.css']
})
export class AddEditWorkstationComponent implements OnInit {
  constructor(private service: WorkstationsService, private workFailuresService: WorkstationFailuresService) { }

  id = 0;
  tag: string;
  workstationname: string;
  xworkstation: string;
  yworkstation: string;
  idroom: number;
  state = 0;
  sanitized = 1;
  archived = 0;

  stateIsBroken: boolean;
  startDate: string;
  endDate: string;

  @Input() passedWorkstation: WorkstationData;
  @Input() noticeChangeVariable: boolean;
  @Input() action: string;

  ngOnInit(): void {
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges(): void {
    // console.log('changed');
    // assign passed workstation values into my values (just the values that need to be assigned)
    this.id = this.passedWorkstation.id;
    this.tag = this.passedWorkstation.tag;
    this.workstationname = this.passedWorkstation.workstationname;
    this.xworkstation = this.passedWorkstation.xworkstation.toString();
    this.yworkstation = this.passedWorkstation.yworkstation.toString();
    this.idroom = this.passedWorkstation.idroom;
    this.state = this.passedWorkstation.state;

    this.stateIsBroken = (this.state === 3);

    if (this.passedWorkstation.state === 3){
      const passedRoomWithDates = this.passedWorkstation as WorkstationDataWithDates;
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

  getWorkstationFromLocalValues(): WorkstationData{
    const val: WorkstationData = {
      id: this.id,
      tag: this.tag,
      workstationname: this.workstationname,
      xworkstation: parseInt(this.xworkstation, 10),
      yworkstation: parseInt(this.yworkstation, 10),
      idroom: this.idroom,
      state: this.stateIsBroken ? 3 : (this.state === 3 ? 0 : this.state),
      sanitized: this.sanitized,
      archived: this.archived,
    };
    return val;
  }

  getWorkFailureFromLocalValues(): WorkstationFailureData {
    if (this.stateIsBroken){
      const failure: WorkstationFailureData = {
        id : 0,
        idworkstation: this.id,
        starttime: this.startDate + ' 00:00:00',
        endtime: this.endDate + ' 00:00:00'
      };
      return failure;
    }else{
      return null;
    }
  }

  takeAction(): void{
    if (this.action === 'add'){
      this.addWorkstation();
    }else if (this.action === 'edit'){
      this.editWorkstation();
    }
  }

  // tslint:disable-next-line:typedef
  addWorkstation() {
    // console.log('addWorkstation' + this.idroom);
    const newWorkstation = this.getWorkstationFromLocalValues();
    if (newWorkstation == null){
      alert('Valori non validi');
      return;
    }
    // all the workstations have to be created with state 0
    newWorkstation.state = 0;
    // console.log(newWorkstation);
    this.service.addWorkstation(newWorkstation).subscribe(res => {
      alert(UtilsService.checkReturnType(res));
    }, error => alert('C\'è stato un errore'));
  }

  editWorkstation(): void{
    const val = this.getWorkstationFromLocalValues();
    if (val == null){
      alert('Valori non validi');
      return;
    }
    const fail = this.getWorkFailureFromLocalValues();
    this.service.modifyWorkstation(val).subscribe(res => {
      alert(UtilsService.checkReturnType(res));
    }, error => alert('C\'è stato un errore'));
    this.workFailuresService.deleteFailureById(this.id).subscribe( (data) => alert(data));
    if (fail !== null) {
      this.workFailuresService.addFailure(fail).subscribe((data) => alert(data));
    }
  }
}
