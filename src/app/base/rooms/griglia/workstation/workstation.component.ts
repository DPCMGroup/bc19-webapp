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

  ngOnInit(): void {
  }

  getColorByState(): string{
    if (this.workstation){
    switch (this.workstation.state){
      case 0:
        return 'primary';
        break;
      case 1:
        return 'secondary';
        break;
      case 2:
        return 'success';
        break;
      case 3:
        return 'danger';
        break;
    }
    }else{
      return 'dark';
    }
  }

}
