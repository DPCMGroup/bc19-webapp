import {Component, Input, OnInit} from '@angular/core';
import { SharedService } from '../../../shared.service';

@Component({
  selector: 'app-add-edit-workstation',
  templateUrl: './add-edit-workstation.component.html',
  styleUrls: ['./add-edit-workstation.component.css']
})
export class AddEditWorkstationComponent implements OnInit {
  constructor(private service: SharedService ) { }

  @Input() workstation: any = {
    id: 0,
    workstationname: 'post1',
    xworkstation: 1,
    yworkstation: 1,
    idroom: 0,
    state: 0,
    archived: 0
  };
  id = 0;
  workstationname: string;
  xworkstation: number;
  yworkstation: number;
  idroom: number;
  state: number;
  archived = 0;

  ngOnInit(): void {
    /*
    this.id = this.workstation.id;
    this.workstationname = this.workstation.workstationname;
    this.xworkstation = this.workstation.xworkstation;
    this.yworkstation = this.workstation.yworkstation;
    this.idroom = this.workstation.idroom;
    this.state = this.workstation.state;
    this.archived = this.workstation.archived;*/
  }

  // tslint:disable-next-line:typedef
  addWorkstation(){
    const val = {
      id: this.id,
      workstationname: this.workstationname,
      xworkstation: this.xworkstation,
      yworkstation: this.yworkstation,
      idroom: this.idroom,
      state: this.state,
      archived: this.archived,
    };
    this.service.addWorkstation(val).subscribe(res => {
      alert(res.toString());
    });
  }
}
