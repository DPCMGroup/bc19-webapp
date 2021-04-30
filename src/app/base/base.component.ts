import { Component, OnInit } from '@angular/core';
import {LocalAccountService} from '../services/local-account.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  constructor(private localAccountService: LocalAccountService) { }

  ngOnInit(): void {
  }

  logout(): void {
    if (confirm('Are you sure?')){
      this.localAccountService.deleteSavedCredentials();
      window.location.href = '/';
    }
  }

}
