import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WorkstationComponent} from './workstation/workstation.component';
import {CredentialsComponent} from './credentials/credentials.component';

const routes: Routes = [
  {path: 'workstation', component: WorkstationComponent},
  {path: 'credentials', component: CredentialsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
