import { Component, OnInit } from '@angular/core';
import {LoginService} from '../services/login.service';
import {compareSegments} from '@angular/compiler-cli/src/ngtsc/sourcemaps/src/segment_marker';
import {LoginData} from '../models/login-data';
import {LocalAccountService} from '../services/local-account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private localAccountService: LocalAccountService ) { }

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
    const retrievedCreds = this.localAccountService.retrieveLocalCredentials();
    this.username = retrievedCreds.username;
    this.password = retrievedCreds.password;
    const credentials: LoginData = {
      username: this.username,
      password: this.password
    };

    this.loginService.login(credentials).subscribe( (data) => {
      if (data.type === 0) {
        // redirect to the base url
        window.location.href = '/base';
      }else{
        this.autoLoggedIn = false;
      }
    });
  }

  login(): void {
    const credentials: LoginData = {
      username: this.username,
      password: this.password
    };
    this.loginService.login(credentials).subscribe( (data) => {
      if ( data.type === 0) {
        // redirect to the base url
        window.location.href = '/base';
        this.setErrorVisible(false);
        // I save user credentials in localStorage
        this.localAccountService.saveCredentialsLocally(credentials);
      }else {
        this.setErrorVisible(true);
        console.log(data);
      }

    });
  }

  setErrorVisible(b: boolean): void {
    console.log('set error visible: ' + b);
    this.errorVisible = b ? 'visible' : 'hidden';
  }

}
