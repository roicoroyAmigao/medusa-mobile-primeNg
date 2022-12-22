import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductListPageRoutingModule } from './products-list-routing.module';

import { ProductListPage } from './product-list.page';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { PrimeComponentsModule } from 'src/app/form-components/prime-components.module';
import { TruncatePipe } from 'src/app/shared/pipes/truncate.pipe';
import { FormComponentsModule } from 'src/app/form-components/form-components.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { VariantModalComponent } from './variant-modal/variant-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductListPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    NgxsModule,
    NgxsFormPluginModule,
    FormComponentsModule,
    PrimeComponentsModule,
    ComponentsModule
  ],
  declarations: [
    ProductListPage,
    TruncatePipe,
    VariantModalComponent
  ]
})
export class ProductListPageModule { }
