import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WorkstationComponent} from './base/workstation/workstation.component';
import {BaseComponent} from './base/base.component';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {CredentialsComponent} from './base/credentials/credentials.component';
import {ReportComponent} from './base/report/report.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'base',
        component: BaseComponent,
        children: [
          {
            path: 'workstation',
            component: WorkstationComponent
          },
          {
            path: 'credential',
            component: CredentialsComponent
          },
          {
            path: 'report',
            component: ReportComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
