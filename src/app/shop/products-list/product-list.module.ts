import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductListPageRoutingModule } from './products-list-routing.module';

import { ProductListPage } from './product-list.page';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { VariantModalComponent } from './variant-modal/variant-modal.component';
import { ComponentsModule } from 'projects/components/src/public-api';
import { FormComponentsModule } from 'projects/form-components/src/public-api';
import { TruncatePipe } from 'src/app/shared/pipes/truncate.pipe';

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
    ComponentsModule,
    FormComponentsModule
  ],
  declarations: [
    ProductListPage,
    VariantModalComponent,
    TruncatePipe
  ],
  entryComponents:[

  ]
})
export class ProductListPageModule { }
