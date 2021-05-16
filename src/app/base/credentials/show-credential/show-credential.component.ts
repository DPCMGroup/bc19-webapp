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
  addEditCredential: any;
  userAction = 'add'; // add or edit

  ngOnInit(): void {
    this.addEditCredential = this.service.userTemplate;
    this.refreshCredentialsList();
  }


  addClick(): void{
    this.userAction = 'add';
    this.addEditCredential = this.service.userTemplate;
  }

  editClick(credential): void{
    this.userAction = 'edit';
    this.addEditCredential = credential;
  }

  closeClick(): void{
    this.refreshCredentialsList();
  }

  refreshCredentialsList(): void{
    this.service.getUserList().subscribe(data => {
      this.CredentialList = data;
    });
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
