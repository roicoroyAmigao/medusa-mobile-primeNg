import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
        loadChildren: () => import('./orders/orders.module').then(m => m.OrdersPageModule)
      },
      {
        path: 'addresses',
        loadChildren: () => import('./addresses/addresses.module').then(m => m.AddressesPageModule)
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
  // {
  //   path: 'details',
  //   loadChildren: () => import('./addresses-component/details/details.module').then( m => m.DetailsPageModule)
  // },
  // {
  //   path: 'addresses',
  //   loadChildren: () => import('./addresses/addresses.module').then( m => m.AddressesPageModule)
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopPageRoutingModule { }
