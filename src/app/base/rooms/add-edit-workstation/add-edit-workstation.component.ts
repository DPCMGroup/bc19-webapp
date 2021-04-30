import {Component, Input, OnInit} from '@angular/core';
import { WorkstationsService } from '../../../services/workstations.service';

@Component({
  selector: 'app-add-edit-workstation',
  templateUrl: './add-edit-workstation.component.html',
  styleUrls: ['./add-edit-workstation.component.css']
})
export class AddEditWorkstationComponent implements OnInit {
  constructor(private service: WorkstationsService ) { }

  id = 0;
  tag: string;
  workstationname: string;
  xworkstation: string;
  yworkstation: string;
  idroom: number;
  state = 0;
  sanitized = 1;
  archived = 0;

  @Input() passedWorkstation: any;
  @Input() noticeChangeVariable: boolean;
  @Input() action: string;

  ngOnInit(): void {
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges(): void {
    console.log('changed');
    // assign passed workstation values into my values (just the values that need to be assigned)
    this.id = this.passedWorkstation.id;
    this.tag = this.passedWorkstation.tag;
    this.workstationname = this.passedWorkstation.workstationname;
    this.xworkstation = this.passedWorkstation.xworkstation.toString();
    this.yworkstation = this.passedWorkstation.yworkstation.toString();
    this.idroom = this.passedWorkstation.idroom;
    this.state = this.passedWorkstation.state.toString();
  }

  getWorkstationFromLocalValues(): any{
    const val = {
      id: this.id,
      tag: this.tag,
      workstationname: this.workstationname,
      xworkstation: parseInt(this.xworkstation, 10),
      yworkstation: parseInt(this.yworkstation, 10),
      idroom: this.idroom,
      state: this.state,
      sanitized: this.sanitized,
      archived: this.archived,
    };
    return val;
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
    console.log('addWorkstation' + this.idroom);
    const newWorkstation = this.getWorkstationFromLocalValues();
    if (newWorkstation == null){
      alert('Values not valid');
      return;
    }
    // all the workstations have to be created with state 0
    newWorkstation.state = 0;
    console.log(newWorkstation);
    this.service.addWorkstation(newWorkstation).subscribe(res => {
      alert(res.toString());
    }, error => alert('There was an error'));
  }

  editWorkstation(): void{
    const val = this.getWorkstationFromLocalValues();
    if (val == null){
      alert('Values not valid');
      return;
    }
    console.log(val);
    this.service.modifyWorkstation(val).subscribe(res => {
      alert(res.toString());
    }, error => alert('There was an error'));
  }
}
