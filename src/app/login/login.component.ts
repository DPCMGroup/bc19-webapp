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

  ngOnInit(): void {
  }

  login(): void {
    const credentials = {
      username: this.username,
      password: this.password
    };
    this.service.login(credentials).subscribe( (data) => {
      if ( data.type === 0) {
        window.location.href = '/base';
      }
      console.log(data);
    });
  }

}
