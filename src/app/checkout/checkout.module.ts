import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckoutPageRoutingModule } from './checkout-routing.module';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { TranslateModule } from '@ngx-translate/core';
import { NgxStripeModule } from 'ngx-stripe';
import { StartComponent } from './start/start.component';
import { PaymentComponent } from './payment/payment.component';
import { ComponentsModule } from '../components/components.module';
import { CartReviewComponent } from './cart-review/cart-review.component';
import { ShippingComponent } from './shipping/shipping.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckoutPageRoutingModule,
    NgxsModule,
    NgxsFormPluginModule,
    TranslateModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStripeModule,
    // OrdersPageModule
  ],
  declarations: [
    StartComponent,
    ShippingComponent,
    PaymentComponent,
    CartReviewComponent
  ],
})
export class CheckoutPageModule {}
