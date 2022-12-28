import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsPageRoutingModule } from './settings-routing.module';

import { SettingsPage } from './settings.page';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { LanguageComponent } from 'src/app/components/language-component/language.component';
import { FormComponentsModule } from 'src/app/form-components/form-components.module';
import { PrimeComponentsModule } from 'src/app/form-components/prime-components.module';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
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
    FormComponentsModule,
    PrimeComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule
  ],
  declarations: [
    SettingsPage,
    LanguageComponent,
    ThemePickerFormComponent
  ],
  entryComponents:[
  ]
})
export class SettingsPageModule { }
