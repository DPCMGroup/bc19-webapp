import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WorkstationComponent} from './base/workstation/workstation.component';
import {BaseComponent} from './base/base.component';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AppComponent,
      },
      {
        path: 'base',
        component: BaseComponent,
        children: [
          {
            path: 'workstation',
            component: WorkstationComponent
          }
        ]
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
