import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  logout(): void {
    if (confirm('Are you sure?')){
      this.clearSavedCredentials();
      window.location.href = '/';
    }
  }

  clearSavedCredentials(): void {
    localStorage.removeItem('username');
    localStorage.removeItem('password');

  }

}
