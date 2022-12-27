import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentComponent } from './payment/payment.component';
import { StartComponent } from './start/start.component';
import { RoutePath } from './route-path.enum';
import { ShippingComponent } from './shipping/shipping.component';
import { CartReviewComponent } from './cart-review/cart-review.component';

const routes: Routes = [
  {
    path: 'flow',
    children: [
      {
        path: '',
        redirectTo: RoutePath.start,
        pathMatch: 'full'
      },
      {
        path: RoutePath.start,
        component: StartComponent,
      },
      {
        path: 'cart-addresses',
        loadChildren: () => import('./cart-addresses/addresses.module').then(m => m.AddressesPageModule)
      },
      {
        path: RoutePath.shipping,
        component: ShippingComponent,
      },
      {
        path: RoutePath.payment,
        component: PaymentComponent,
      },
      {
        path: 'cart-review',
        component: CartReviewComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutPageRoutingModule { }
