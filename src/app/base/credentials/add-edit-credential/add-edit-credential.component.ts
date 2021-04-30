import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-add-edit-credential',
  templateUrl: './add-edit-credential.component.html',
  styleUrls: ['./add-edit-credential.component.css']
})
export class AddEditCredentialComponent implements OnInit {
  constructor(private service: UserService ) { }

  // these are the values that can be edited by the webapp user
  id: any;
  username: any;
  password: any;
  name: any;
  surname: any;
  mail: any;
  type: any;
  archived: any;

  @Input() action: string;
  @Input() credential: any;

  ngOnInit(): void {
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges(): void {
    console.log('add-edit-credential changed');
    // copy the values from the credential objects that was passed to the local values
    this.id = this.credential.id;
    this.username = this.credential.username;
    this.password = this.credential.password;
    this.name = this.credential.name;
    this.surname = this.credential.surname;
    this.mail = this.credential.mail;
    this.type = this.credential.type;
    this.archived = this.credential.archived;
  }

  getCredentialFromLocalValues(): any {
    // check if type is in the valid range
    const typeNum = parseInt(this.type, 10);
    if (typeNum < 0 || typeNum > 2){
      return null;
    }
    const newCredential = {
      id: this.id,
      username: this.username,
      password: this.password,
      name: this.name,
      surname: this.surname,
      mail: this.mail,
      type: typeNum,
      archived: this.archived
    };

    // all created or edited credentials will have archived = 0
    newCredential.archived = 0;

    return newCredential;
  }

  // decides, based on the action variable, if to add or to edit the credential
  takeAction(): void {
    if (this.action === 'add'){
      this.addCredential();
    }else if (this.action === 'edit'){
      this.editredential();
    }
  }

  addCredential(): void{
    const newCredential = this.getCredentialFromLocalValues();
    if (newCredential == null){
      alert('Type is not in the valid range');
      return;
    }
    console.log('addingCredential');
    console.log(newCredential);
    this.service.addUser(newCredential).subscribe(res => {
      alert(res.toString());
    }, error => (alert('There was an error')));

  }

  editredential(): void{
    const newCredential = this.getCredentialFromLocalValues();
    if (newCredential == null){
      alert('Type is not in the valid range');
      return;
    }
    console.log('editingCredential');
    console.log(newCredential);
    this.service.modifyUser(newCredential).subscribe(res => {
      alert(res.toString());
    }, error => (alert('There was an error')));

  }
}
