import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressDetailsComponent } from '../addresses/address-details/address-details.component';
import { AddressesComponent } from '../addresses/addresses.component';
import { OrdersPage } from './orders.page';

const routes: Routes = [
  {
    path: '',
    component: OrdersPage,
    children:[
      {
        path: '',
        redirectTo: 'adresses',
        pathMatch: 'full'
      },
      {
        path: 'addresses',
        component: AddressesComponent,
      },
      {
        path: 'address-details',
        component: AddressDetailsComponent,
      },
      {
        path: 'orders',
        loadChildren: () => import('../orders/orders.module').then( m => m.OrdersPageModule)
      },
      // {
      //   path: 'orders',
      //   component: AddressesComponent,
      // },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersPageRoutingModule {}
