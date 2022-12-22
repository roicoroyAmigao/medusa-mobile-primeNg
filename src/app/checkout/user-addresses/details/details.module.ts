import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsPageRoutingModule } from './details-routing.module';

import { DetailsPage } from './details.page';
import { ComponentsModule } from 'src/app/form-components/prime-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { FormComponentsModule } from 'src/app/form-components/form-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    NgxsModule,
    NgxsFormPluginModule,
    ReactiveFormsModule,
    FormComponentsModule,
    ComponentsModule
  ],
  declarations: [
    DetailsPage
  ]
})
export class DetailsPageModule { }
