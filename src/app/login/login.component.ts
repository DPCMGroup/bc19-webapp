import { Component, OnInit } from '@angular/core';
import {SharedService} from '../shared.service';
import {compareSegments} from '@angular/compiler-cli/src/ngtsc/sourcemaps/src/segment_marker';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: SharedService ) { }

  username: string;
  password: string;

  errorVisible: string;

  ngOnInit(): void {
    this.setErrorVisible(false);
  }

  focused(): void {
    this.setErrorVisible(false);
  }

  login(): void {
    const credentials = {
      username: this.username,
      password: this.password
    };
    this.service.login(credentials).subscribe( (data) => {
      if ( data.type === 0) {
        window.location.href = '/base';
        this.setErrorVisible(false);
      }
      this.setErrorVisible(true);
      console.log(data);

    });
  }

  loginServiceNoDB(credentials): Promise<any>{
    const validCred =  {
      username: 'mrossi',
      password: '000',
      type: 0
    };
    return new Promise<any>((resolve, reject) => {
      setTimeout( () => {
        if (credentials.username === validCred.username
         && credentials.password === validCred.password) {
          resolve(validCred);
        }else{
          resolve('No user found');
        }
      }, 100);
    });
  }

  loginNoDB(): void {
    const credentials = {
      username: this.username,
      password: this.password
    };
    this.loginServiceNoDB(credentials).then( (data) => {
      if ( data.type === 0) {
        window.location.href = '/base';
        this.setErrorVisible(false);
      }
      this.setErrorVisible(true);
      console.log(data);

    });
  }

  setErrorVisible(b: boolean): void {
    console.log('set error visible: ' + b);
    this.errorVisible = b ? 'visible' : 'hidden';
  }

}
