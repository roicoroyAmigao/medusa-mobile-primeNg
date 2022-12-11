import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersPageRoutingModule } from './orders-routing.module';

import { OrdersPage } from './orders.page';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { AddressesComponent } from '../addresses/addresses.component';
import { AddressDetailsComponent } from '../addresses/address-details/address-details.component';
import { AddressBillingDetailsComponent } from '../addresses/billing-address-details/billing-address-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersPageRoutingModule,
    ReactiveFormsModule,
    NgxsModule,
    NgxsFormPluginModule,
    TranslateModule,
  ],
  declarations: [
    OrdersPage,
    OrderDetailsComponent,
  ]
})
export class OrdersPageModule { }
