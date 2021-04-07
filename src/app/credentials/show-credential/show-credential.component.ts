import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-show-credential',
  templateUrl: './show-credential.component.html',
  styleUrls: ['./show-credential.component.css']
})
export class ShowCredentialComponent implements OnInit {

  constructor(private service: SharedService) { }

  CredentialList: any = [];
  ModalTitle: string | undefined;
  credential: any;
  // tslint:disable-next-line
  ActivateAddEditCredentialComp: boolean = false;
  ngOnInit(): void {
    this.refreshWorkstationList();
  }

  // tslint:disable-next-line:typedef
  addClick(){
    this.credential = {
      WorkstationId: 0,
      Xposition: '',
      Yposition: '',
      Status: 'NonDisponibile'};
    this.ModalTitle = 'Add credential';
    this.ActivateAddEditCredentialComp = true;
  }

  // tslint:disable-next-line:typedef
  closeClick(){
    this.ActivateAddEditCredentialComp = false;
    this.refreshWorkstationList();
  }

  // tslint:disable-next-line:typedef
  refreshWorkstationList(){
    this.service.getWorkstationList().subscribe(data => {
      this.CredentialList = data;
    });
  }

  // tslint:disable-next-line:typedef
  deleteClick(item: { CredentialId: any; }){
    if (confirm('Are you sure??')){
      this.service.deleteWorkstation(item.CredentialId).subscribe(data => {
        alert(data.toString());
        this.refreshWorkstationList();
      });
    }
  }
}
