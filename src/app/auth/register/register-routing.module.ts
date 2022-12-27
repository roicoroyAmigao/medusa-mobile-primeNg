import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'user',
        component: UserComponent,
      },
      {
        path: 'address',
        component: AddressComponent,
      },
      {
        path: '',
        redirectTo: '/user',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/user',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterPageRoutingModule { }
