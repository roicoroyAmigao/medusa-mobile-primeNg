import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { TruncatePipe } from './pipes/truncate.pipe';


@NgModule({
  declarations: [
    TruncatePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ReactiveFormsModule,
    NgxsModule,
    NgxsFormPluginModule,
  ],
  exports: [
    TruncatePipe
  ]
})
export class ServicesModule { }
