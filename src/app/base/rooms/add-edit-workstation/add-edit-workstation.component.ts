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
  xworkstation: number;
  yworkstation: number;
  @Input() idroom;
  state: number;
  archived = 0;

  ngOnInit(): void {
    console.log('ngOnInit ' + this.idroom);
    /*
    this.id = this.workstation.id;
    this.workstationname = this.workstation.workstationname;
    this.xworkstation = this.workstation.xworkstation;
    this.yworkstation = this.workstation.yworkstation;
    this.idroom = this.workstation.idroom;
    this.state = this.workstation.state;
    this.archived = this.workstation.archived;*/
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges(obj: any): void {
    console.log(obj);
  }

  // tslint:disable-next-line:typedef
  addWorkstation() {
    console.log('addWorkstation' + this.idroom);
    const val = {
      id: this.id,
      tag: this.tag,
      workstationname: this.workstationname,
      xworkstation: this.xworkstation,
      yworkstation: this.yworkstation,
      idroom: this.idroom,
      state: this.state,
      archived: this.archived,
    };
    console.log(val);
    this.service.addWorkstation(val).subscribe(res => {
      alert(res.toString());
    });
  }
}
