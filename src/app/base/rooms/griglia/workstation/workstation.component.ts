import {Component, EventEmitter, Input, OnInit, OnChanges, Output} from '@angular/core';
import {WorkstationData, WorkstationDataWithDates} from '../../../../models/workstation-data';
import {WorkstationsService} from '../../../../services/workstations.service';
import {UtilsService} from '../../../../services/utils.service';

@Component({
  selector: 'app-workstation',
  templateUrl: './workstation.component.html',
  styleUrls: ['./workstation.component.css']
})
export class WorkstationComponent implements OnInit, OnChanges {

  constructor(private workstationService: WorkstationsService) { }

  @Input() workstation: WorkstationData;
  @Input() insertedPosX: number;
  @Input() insertedPosY: number;
  @Input() insertedRoomId: number;
  id = 0;
  tag = '';
  workstationname = '';
  xworkstation = 0;
  yworkstation = 0;
  idroom = 0;
  state = 0;
  sanitized = 0;
  archived = 0;
  startDate = '';
  endDate = '';

  @Output() newItemEvent = new EventEmitter<WorkstationData>();

  ngOnInit(): void {
    this.setAttributes();
  }

  ngOnChanges(): void {
    this.setAttributes();
  }

  setAttributes(): void {
    this.id = this.workstation !== null ? this.workstation.id : 0;
    this.tag = this.workstation !== null ? this.workstation.tag : '';
    this.workstationname = this.workstation !== null ? this.workstation.workstationname : '';
    this.xworkstation = this.workstation !== null ? this.workstation.xworkstation : 0;
    this.yworkstation = this.workstation !== null ? this.workstation.yworkstation : 0;
    this.idroom = this.workstation !== null ? this.workstation.idroom : 0;
    this.state = this.workstation !== null ? this.workstation.state : 0;
    this.sanitized = this.workstation !== null ? this.workstation.sanitized : 0;
    this.archived = this.workstation !== null ? this.workstation.archived : 0;
    if ( this.workstation != null && this.workstation.state === 3){
      const passedWorkstationWithDates = this.workstation as WorkstationDataWithDates;
      console.log('workId: ' + this.workstation.id);
      this.startDate = UtilsService.convertDateAPIToHtml(passedWorkstationWithDates.failureFrom);
      this.endDate = UtilsService.convertDateAPIToHtml(passedWorkstationWithDates.failureTo);
    }else{
      const currentDate = new Date().toLocaleDateString();
      const parts = currentDate.split('/');
      for (let i = 0; i < parts.length; i++){
        parts[i] = parts[i].length === 1 ? '0' + parts[i] : parts[i];
      }
      const newDate = parts[2] + '-' + parts[0] + '-' + parts[1];
      // console.log(newDate);
      this.startDate = newDate;
      this.endDate = '2030-01-01';
    }
  }

  getColorByState(): string{

    if (this.workstation){
      const combination = {state: this.workstation.state, sanit: this.workstation.sanitized};
      if (combination.state === 0 && combination.sanit === 0){
        return 'primary';
      }else if (combination.state === 0 && combination.sanit === 1){
        return 'success';
      }else if (combination.state === 1 && combination.sanit === 1){
        return 'secondary';
      }else if (combination.state === 2 && combination.sanit === 0){
        return 'danger';
      }else if (combination.state === 2 && combination.sanit === 1){
        return 'info';
      }else if (combination.state === 3 && combination.sanit === 0){
        return 'dark';
      }else if (combination.state === 3 && combination.sanit === 1){
        return 'warning';
      }else if (combination.state === 1 && combination.sanit === 0) {
        return 'outline-danger';
      }

    }else{
      return 'outline-light';
    }
  }

  deleteWorkstation(): void{
    this.workstationService.deleteWorkstation(this.workstation.id).subscribe(
      (data) => {alert(UtilsService.checkReturnType(data)); this.workstation = null; }
    );
  }

  openEditWorkstation(): void {
    this.newItemEvent.emit(this.workstation);
  }

  stateNumToString(type: number): string{
    let typeString = '';
    switch (type){
      case 0:
        typeString = 'Disponibile';
        break;
      case 1:
        typeString = 'Occupata';
        break;
      case 2:
        typeString = 'Prenotata';
        break;
      case 3:
        typeString = 'Rotta';
        break;
    }
    return typeString;
  }

  sanitizedNumToString(type: number): string{
    let typeString = '';
    switch (type){
      case 0:
        typeString = 'Non igienizzata';
        break;
      case 1:
        typeString = 'Igienizzata';
        break;
    }
    return typeString;
  }

  print(s: string): void {
    console.log(s);
  }

}
