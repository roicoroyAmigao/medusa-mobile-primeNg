import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { TranslateModule } from '@ngx-translate/core';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { UserComponent } from './user/user.component';
import { AddressComponent } from './address/address.component';
import { PrimeComponentsModule } from 'src/app/form-components/prime-components.module';
import { FormComponentsModule } from 'src/app/form-components/form-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule,
    NgxsFormPluginModule,
    NgxsStoragePluginModule,
    PrimeComponentsModule,
    FormComponentsModule
  ],
  declarations: [
    UserComponent,
    AddressComponent
  ]
})
export class RegisterPageModule {}
