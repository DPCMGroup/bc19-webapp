import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WorkstationComponent} from './workstation/workstation.component';
import {BaseComponent} from './base/base.component';
import {AppComponent} from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path: 'base',
    children: [
      {
        path: '',
        component: BaseComponent
      },
      {
        path: 'workstation',
        component: WorkstationComponent
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
