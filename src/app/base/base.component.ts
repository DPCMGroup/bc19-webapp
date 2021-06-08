import { Component, OnInit } from '@angular/core';
import {LocalAccountService} from '../services/local-account.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent{

  constructor(private localAccountService: LocalAccountService) { }

  logout(): void {
    if (confirm('Are you sure?')){
      this.localAccountService.deleteSavedCredentials();
      window.location.href = '/';
    }
  }

  /*
  tempAlert(msg, duration): void{
    const el = document.createElement('div');
    el.setAttribute('style', 'position:absolute;top:40%;left:20%;background-color:white;');
    el.innerHTML = msg;
    setTimeout(() =>{
      el.parentNode.removeChild(el);
    }, duration);
    document.body.appendChild(el);
  }*/

}
