import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddressesPageRoutingModule } from './addresses-routing.module';
import { AddressesPage } from './addresses.page';
import { AddressDetailsComponent } from './address-details/address-details.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { ComponentsModule } from 'src/app/form-components/components.module';
import { FormComponentsModule } from 'src/app/form-components/form-components.module copy';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddressesPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    NgxsModule,
    NgxsFormPluginModule,
    FormComponentsModule,
    ComponentsModule
  ],
  declarations: [
    AddressesPage,
    AddressDetailsComponent
  ]
})
export class AddressesPageModule {}
