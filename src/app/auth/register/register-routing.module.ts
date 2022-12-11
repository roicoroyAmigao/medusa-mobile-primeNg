import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressComponent } from './address/address.component';

import { RegisterPage } from './register.page';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',
    // component: RegisterPage,
    children: [
      {
        path: 'user',
        component: UserComponent,
        // outlet: 'outlet-register-main'
      },
      {
        path: 'address',
        component: AddressComponent,
        // outlet: 'outlet-register-main'
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
