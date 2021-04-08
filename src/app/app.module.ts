import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorkstationComponent } from './workstation/workstation.component';
import { ShowWorkstationComponent } from './workstation/show-workstation/show-workstation.component';
import { AddEditWorkstationComponent } from './workstation/add-edit-workstation/add-edit-workstation.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedService} from './shared.service';
import { CredentialsComponent } from './credentials/credentials.component';
import { AddEditCredentialComponent } from './credentials/add-edit-credential/add-edit-credential.component';
import { ShowCredentialComponent } from './credentials/show-credential/show-credential.component';
@NgModule({
  declarations: [
    AppComponent,
    WorkstationComponent,
    ShowWorkstationComponent,
    AddEditWorkstationComponent,
    CredentialsComponent,
    AddEditCredentialComponent,
    ShowCredentialComponent
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
