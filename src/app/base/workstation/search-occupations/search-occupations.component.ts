import {Component, Input, OnInit} from '@angular/core';
import { SharedService } from '../../../shared.service';
@Component({
  selector: 'app-search-occupations',
  templateUrl: './search-occupations.component.html',
  styleUrls: ['./search-occupations.component.css']
})
export class SearchOccupationsComponent implements OnInit {

  constructor(private service: SharedService ) { }

  @Input() workstation: any;
  credential: any;
  WorkstationId: number | undefined;
  Username: string | undefined;

  ngOnInit(): void {
    this.WorkstationId = this.workstation.WorkstationId;
    this.Username = this.credential.Username;
  }

  // tslint:disable-next-line:typedef
  searchWorkstation(){
    const val = {WorkstationId: this.WorkstationId,
      Username: this.Username };
 //   this.service.addWorkstation(val).subscribe(res => {
  //    alert(res.toString());
  //  });
  }
}
