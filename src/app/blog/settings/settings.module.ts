import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsPageRoutingModule } from './settings-routing.module';

import { SettingsPage } from './settings.page';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { ThemePickerFormComponent } from './theme-picker-form/theme-picker-form.component';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsPageRoutingModule,
    CommonModule,
    NgxsModule,
    NgxsFormPluginModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule
  ],
  declarations: [
    SettingsPage,
    ThemePickerFormComponent
  ],
  entryComponents:[
  ]
})
export class SettingsPageModule { }
