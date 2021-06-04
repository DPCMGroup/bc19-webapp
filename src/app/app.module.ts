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
import { RoomsComponent } from './base/rooms/rooms.component';
import { AddEditRoomComponent } from './base/rooms/add-edit-room/add-edit-room.component';
import {RoomsService} from './services/rooms.service';
import {WorkstationsService} from './services/workstations.service';
import {UserService} from './services/user.service';
import {LoginService} from './services/login.service';
import { GridComponent } from './base/rooms/grid/grid.component';
import { WorkstationComponent } from './base/rooms/grid/workstation/workstation.component';
import { ShowOccupationsReportComponent } from './base/report/show-report/show-occupations-report/show-occupations-report.component';
import { ShowSanitizationsReportComponent } from './base/report/show-report/show-sanitizations-report/show-sanitizations-report.component';
import { ShowReportsReportComponent } from './base/report/show-report/show-reports-report/show-reports-report.component';

// @ts-ignore
// @ts-ignore
// @ts-ignore
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
    AddEditRoomComponent,
    GridComponent,
    WorkstationComponent,
    ShowOccupationsReportComponent,
    ShowSanitizationsReportComponent,
    ShowReportsReportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  /*
  http://dpcm2077.duckdns.org:8000
  http://192.168.210.35:8000 (if connected to vpn)
  http://localhost:8000 (if using local server)
   */
  providers: [{provide: 'apiUrl', useValue: 'http://dpcm2077.duckdns.org:8000'},
    RoomsService, WorkstationsService, UserService, LoginService],
  bootstrap: [AppComponent]
})

export class AppModule { }
