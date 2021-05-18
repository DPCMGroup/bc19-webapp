import { Component, OnInit } from '@angular/core';
import {UserService} from 'src/app/services/user.service';
import {UserData} from '../../../models/user-data';

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
        alert(data.toString());
        this.refreshCredentialsList();
      }, error => (alert('C\'è stato un errore')));
    }
  }
}
