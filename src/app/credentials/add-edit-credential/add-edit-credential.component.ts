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
  Name: string | undefined;
  Surname: string | undefined;
  Username: string | undefined;
  Email: string | undefined;
  Type: string | undefined;
  Password: string | undefined;

  ngOnInit(): void {
    this.Name = this.credential.Name;
    this.Surname = this.credential.Surname;
    this.Username = this.credential.Username;
    this.Email = this.credential.Email;
    this.Type = this.credential.Type;
    this.Password = this.credential.Password;
  }

  // tslint:disable-next-line:typedef
  addCredential(){
    const val = {Name: this.Name,
      Surname: this.Surname,
      Username: this.Username,
      Email: this.Email,
      Type: this.Type,
      Password: this.Password};
    alert('Can\'t add. There is not a service yet');
    /*
    this.service.addWorkstation(val).subscribe(res => {
      alert(res.toString());
    });
     */
  }
}
