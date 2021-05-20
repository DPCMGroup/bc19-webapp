import {Component, Input, OnInit} from '@angular/core';
import {WorkstationData} from '../../../../models/workstation-data';

@Component({
  selector: 'app-workstation',
  templateUrl: './workstation.component.html',
  styleUrls: ['./workstation.component.css']
})
export class WorkstationComponent implements OnInit {

  constructor() { }

  @Input() workstation: WorkstationData;
  id = 0;
  tag = '';
  workstationname = '';
  xworkstation = 0;
  yworkstation = 0;
  idroom = 0;
  state = 0;
  sanitized = 0;
  archived = 0;

  ngOnInit(): void {
    this.setAttributes();
  }

  setAttributes(): void {
    this.id = this.workstation ? this.workstation.id : 0;
    this.tag = this.workstation ? this.workstation.tag : '';
    this.workstationname = this.workstation ? this.workstation.workstationname : '';
    this.xworkstation = this.workstation ? this.workstation.xworkstation : 0;
    this.yworkstation = this.workstation ? this.workstation.yworkstation : 0;
    this.idroom = this.workstation ? this.workstation.idroom : 0;
    this.state = this.workstation ? this.workstation.state : 0;
    this.sanitized = this.workstation ? this.workstation.sanitized : 0;
    this.archived = this.workstation ? this.workstation.archived : 0;
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
      }

    }else{
      return 'outline-light';
    }
  }

  printWorkstation(): void {
    console.log(this.workstation);
  }

  printTag(): void {
    console.log('tag: ' + this.tag);
  }

}
