import {Component, Input, OnInit} from '@angular/core';
import { SharedService } from '../../../shared.service';

@Component({
  selector: 'app-add-edit-workstation',
  templateUrl: './add-edit-workstation.component.html',
  styleUrls: ['./add-edit-workstation.component.css']
})
export class AddEditWorkstationComponent implements OnInit {
  constructor(private service: SharedService ) { }

  id = 0;
  tag: string;
  workstationname: string;
  xworkstation: string;
  yworkstation: string;
  idroom: number;
  state: string;
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

  takeAction(): void{
    if (this.action === 'add'){
      this.addWorkstation();
    }else if(this.action === 'edit'){
      this.editWorkstation();
    }
  }

  // tslint:disable-next-line:typedef
  addWorkstation() {
    console.log('addWorkstation' + this.idroom);
    // check whether the inputs are valid
    const numState = parseInt(this.state, 10);
    if ( numState < 0 || numState > 3){
      alert('State not in the valid range');
      return;
    }
    const val = {
      id: this.id,
      tag: this.tag,
      workstationname: this.workstationname,
      xworkstation: parseInt(this.xworkstation, 10),
      yworkstation: parseInt(this.yworkstation, 10),
      idroom: this.idroom,
      state: numState,
      sanitized: this.sanitized,
      archived: this.archived,
    };
    console.log(val);
    this.service.addWorkstation(val).subscribe(res => {
      alert(res.toString());
    }, error => alert('There was an error'));
  }

  editWorkstation(): void{
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
    this.service.modifyWorkstation(val).subscribe(res => {
      alert(res.toString());
    }, error => alert('There was an error'));
  }
}
