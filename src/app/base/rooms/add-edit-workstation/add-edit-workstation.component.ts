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
  @Input() idroom;
  state: string;
  sanitized = 1;
  archived = 0;

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  addWorkstation() {
    console.log('addWorkstation' + this.idroom);
    // check whether the inputs are valid
    const numState = parseInt(this.state, 10);
    if( numState < 0 || numState > 3){
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
    });
  }
}
