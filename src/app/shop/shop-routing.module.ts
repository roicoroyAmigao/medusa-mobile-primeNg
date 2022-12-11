import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressesComponent } from './addresses/addresses.component';
import { ShopPage } from './shop.page';

const routes: Routes = [
  {
    path: '',
    component: ShopPage,
    children: [
      {
        path: 'products-list',
        loadChildren: () => import('./products-list/product-list.module').then(m => m.ProductListPageModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('./orders/orders.module').then( m => m.OrdersPageModule)
      },
      {
        path: 'addresses',
        component: AddressesComponent,
      },
      {
        path: '',
        redirectTo: '/products-list',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/products-list',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopPageRoutingModule { }
