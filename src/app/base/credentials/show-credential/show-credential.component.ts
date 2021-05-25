import { Component, OnInit } from '@angular/core';
import {UserService} from 'src/app/services/user.service';
import {UserData} from '../../../models/user-data';
import {UtilsService} from '../../../services/utils.service';

@Component({
  selector: 'app-show-credential',
  templateUrl: './show-credential.component.html',
  styleUrls: ['./show-credential.component.css']
})
export class ShowCredentialComponent implements OnInit {

  constructor(private service: UserService) { }

  CredentialList: UserData[] = [];
  addEditCredential: UserData;
  userAction = 'add'; // add or edit

  ngOnInit(): void {
    this.addEditCredential = new UserData();
    this.refreshCredentialsList();
  }


  addClick(): void{
    this.userAction = 'add';
    this.addEditCredential = new UserData();
  }

  editClick(credential): void{
    this.userAction = 'edit';
    this.addEditCredential = credential;
  }

  closeClick(): void{
    this.refreshCredentialsList();
  }

  setCredentialsList(data: any[]): void {
    this.CredentialList = data;
  }

  refreshCredentialsList(): void{
    this.service.getUserList().subscribe(data => this.setCredentialsList(data));
  }

  deleteClick(item: { id: any; }): void{
    if (confirm('Sei sicuro??')){

      this.service.deleteUser(item.id).subscribe(data => {
        alert(UtilsService.checkReturnType(data));
        this.refreshCredentialsList();
      }, error => (alert('C\'è stato un errore')));
    }
  }

  typeNumToString(type: number): string{
    let typeString = '';
    switch (type){
      case 0:
        typeString = 'Amministratore';
        break;
      case 1:
        typeString = 'Dipendente';
        break;
      case 2:
        typeString = 'Addetto';
        break;
    }
    return typeString;
  }
}
