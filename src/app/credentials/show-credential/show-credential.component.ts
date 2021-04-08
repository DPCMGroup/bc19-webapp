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
    this.refreshCredentialsList();
  }

  // tslint:disable-next-line:typedef
  addClick(){
    this.credential = {
      Name: '',
      Surname: '',
      Username: '',
      Email: '',
      Type: 'Dipendente'};
    this.ModalTitle = 'Add credential';
    this.ActivateAddEditCredentialComp = true;
  }

  // tslint:disable-next-line:typedef
  closeClick(){
    this.ActivateAddEditCredentialComp = false;
    this.refreshCredentialsList();
  }

  // tslint:disable-next-line:typedef
  refreshCredentialsList(){
    /* JUST FOR TESTING*/
    const tempList: any = [];
    tempList.push({
      Name: 'Mario',
      Surname: 'Rossi',
      Username: 'dip0',
      Email: 'mario.rossi@gmail.com',
      Type: 'Dipendente'
    });
    this.CredentialList = tempList;
    console.log('refreshed');

    /*
    this.service.getWorkstationList().subscribe(data => {
      this.CredentialList = data;
    });
     */
  }

  // tslint:disable-next-line:typedef
  deleteClick(item: { Username: any; }){
    if (confirm('Are you sure??')){
      /*
      this.service.deleteWorkstation(item.CredentialId).subscribe(data => {
        alert(data.toString());
        this.refreshWorkstationList();
      });
       */
    }
  }
}
