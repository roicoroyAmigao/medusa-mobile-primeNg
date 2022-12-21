import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { ProductDetailsComponent } from './product-details-component/product-details.component';
import { CartMenuComponent } from './app-menu/cart-menu.component';
import { MedusaCartComponent } from './medusa-cart/medusa-cart.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ReactiveFormsModule,
    TranslateModule,
    NgxsModule,
    NgxsFormPluginModule,
  ],
  declarations: [
    ProductDetailsComponent,
    CartMenuComponent,
    MedusaCartComponent
  ],
  exports: [
    ProductDetailsComponent,
    CartMenuComponent,
    MedusaCartComponent
  ],
})
export class ComponentsModule { }