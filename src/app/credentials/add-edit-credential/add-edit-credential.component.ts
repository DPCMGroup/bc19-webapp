import {Component, Input, OnInit} from '@angular/core';
import {SharedService} from '../../shared.service';

@Component({
  selector: 'app-add-edit-credential',
  templateUrl: './add-edit-credential.component.html',
  styleUrls: ['./add-edit-credential.component.css']
})
export class AddEditCredentialComponent implements OnInit {
  constructor(private service: SharedService ) { }

  @Input() credential: any;
  WorkstationId: number | undefined;
  Xposition: number | undefined;
  Yposition: number | undefined;
  Status: string | undefined;

  ngOnInit(): void {
    this.WorkstationId = this.credential.WorkstationId;
    this.Xposition = this.credential.Xposition;
    this.Yposition = this.credential.Yposition;
    this.Status = this.credential.Status;
  }

  // tslint:disable-next-line:typedef
  addWorkstation(){
    const val = {CredentialId: this.WorkstationId,
      Xposition: this.Xposition,
      Yposition: this.Yposition,
      Status: this.Status};
    this.service.addWorkstation(val).subscribe(res => {
      alert(res.toString());
    });
  }
}
