import { Component, OnInit } from '@angular/core';
import {LoginService} from '../services/login.service';
import {compareSegments} from '@angular/compiler-cli/src/ngtsc/sourcemaps/src/segment_marker';
import {LoginData} from '../models/login-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: LoginService ) { }

  username: string;
  password: string;

  // use this to check if the user can auto login with his saved credentials
  autoLoggedIn: boolean;
  errorVisible: string;

  ngOnInit(): void {
    this.autoLoggedIn = true;
    this.setErrorVisible(false);
    // try to do an auto login
    this.autoLogin();
  }

  focused(): void {
    this.setErrorVisible(false);
  }

  autoLogin(): void {
    this.username = localStorage.getItem('username');
    this.password = localStorage.getItem('password');
    const credentials: LoginData = {
      username: this.username,
      password: this.password
    };

    this.service.login(credentials).subscribe( (data) => {
      if (data.type === 0) {
        // redirect to the base url
        window.location.href = '/base';
      }else{
        this.autoLoggedIn = false;
      }
    });
  }

  login(): void {
    const credentials = {
      username: this.username,
      password: this.password
    };
    this.service.login(credentials).subscribe( (data) => {
      if ( data.type === 0) {
        // redirect to the base url
        window.location.href = '/base';
        this.setErrorVisible(false);
        // I save user credentials in localStorage
        if (localStorage.getItem('username') === null
        || localStorage.getItem('password') === null){
          localStorage.setItem('username', this.username);
          localStorage.setItem('password', this.password);
        }
      }else {
        this.setErrorVisible(true);
        console.log(data);
      }

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
