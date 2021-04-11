import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AddEditWorkstationComponent} from './base/rooms/add-edit-workstation/add-edit-workstation.component';
import { CredentialsComponent } from './base/credentials/credentials.component';
import { AddEditCredentialComponent } from './base/credentials/add-edit-credential/add-edit-credential.component';
import { ShowCredentialComponent } from './base/credentials/show-credential/show-credential.component';
import { ReportComponent } from './base/report/report.component';
import { BaseComponent } from './base/base.component';
import { LoginComponent } from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedService} from './shared.service';
import { RoomsComponent } from './base/rooms/rooms.component';

@NgModule({
  declarations: [
    AppComponent,
    AddEditWorkstationComponent,
    BaseComponent,
    LoginComponent,
    CredentialsComponent,
    AddEditCredentialComponent,
    ShowCredentialComponent,
    ReportComponent,
    RoomsComponent,
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
