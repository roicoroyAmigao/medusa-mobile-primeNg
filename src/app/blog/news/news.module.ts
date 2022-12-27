import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsPageRoutingModule } from './news-routing.module';

import { NewsPage } from './news.page';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxsModule,
    NgxsFormPluginModule,
    TranslateModule,
    NewsPageRoutingModule
  ],
  declarations: [NewsPage]
})
export class NewsPageModule {}
