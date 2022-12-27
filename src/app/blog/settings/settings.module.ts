import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsPageRoutingModule } from './settings-routing.module';

import { SettingsPage } from './settings.page';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { ComponentsModule } from 'src/app/components/components.module';
import { LanguageComponent } from 'src/app/components/language-component/language.component';

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
    ComponentsModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [
    SettingsPage,
  ],
  entryComponents:[
  ]
})
export class SettingsPageModule { }
