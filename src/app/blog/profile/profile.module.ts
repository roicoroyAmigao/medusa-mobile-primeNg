import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { ImagePickerComponent } from './image-picker/image-picker.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxsModule,
    NgxsFormPluginModule,
    TranslateModule,
    ProfilePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    ProfilePage,
    ImagePickerComponent
  ]
})
export class ProfilePageModule {}
