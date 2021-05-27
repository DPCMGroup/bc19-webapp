import {Component, OnInit, Type} from '@angular/core';
import {LoginService} from '../services/login.service';
import {compareSegments} from '@angular/compiler-cli/src/ngtsc/sourcemaps/src/segment_marker';
import {LoginData} from '../models/login-data';
import {LocalAccountService} from '../services/local-account.service';
import {UtilsService} from '../services/utils.service';
import * as Util from 'util';

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
  errorVisible1: string;

  ngOnInit(): void {
    this.autoLoggedIn = true;
    this.setErrorVisible(false);
    this.setErrorVisible_(false);
    // try to do an auto login
    this.autoLogin();
  }

  focused(): void {
    this.setErrorVisible(false);
    this.setErrorVisible_(false);
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
      /*
      se archived è uguale a 1 l'api restituisce un errore numerico
      se l'utente non è presente l'api restituisce un altro errore numerico
      se l'utente è presente e non archiviato l'api resituisce un oggetto di tipo UserData
      */
      console.log(data);
      if ( data === 16386 ){
        this.setErrorVisible(true);
      }else if ( data === 16392 ) {
        this.setErrorVisible_(true);
      }else
      if ( data.type === 0 && data.archived === 0 ) {
        // redirect to the base url
        window.location.href = '/base';
        this.setErrorVisible(false);
        this.setErrorVisible_(false);
        // I save user credentials in localStorage
        this.localAccountService.saveCredentialsLocally(credentials);
        console.log('primo');
      }
      /*else if ( data.type !== 0) {
        this.setErrorVisible(true);
        console.log('secondo');
      }else { this.setErrorVisible_(true);
              console.log('terzo'); }*/
    });
  }

  setErrorVisible(b: boolean): void {
    console.log('set error visible: ' + b);
    this.errorVisible = b ? 'visible' : 'hidden';
  }
  setErrorVisible_(b: boolean): void {
    console.log('set error visible: ' + b);
    this.errorVisible1 = b ? 'visible' : 'hidden';
  }

}
