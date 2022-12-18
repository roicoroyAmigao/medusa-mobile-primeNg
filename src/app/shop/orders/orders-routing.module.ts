import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
        path: 'orders',
        loadChildren: () => import('../orders/orders.module').then( m => m.OrdersPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersPageRoutingModule {}
