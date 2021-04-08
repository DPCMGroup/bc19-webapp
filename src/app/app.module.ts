import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorkstationComponent } from './base/workstation/workstation.component';
import {AddEditWorkstationComponent} from './base/workstation/add-edit-workstation/add-edit-workstation.component';
import {ShowWorkstationComponent} from './base/workstation/show-workstation/show-workstation.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedService} from './shared.service';
import { BaseComponent } from './base/base.component';
import { LoginComponent } from './login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    WorkstationComponent,
    AddEditWorkstationComponent,
    ShowWorkstationComponent,
    BaseComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
