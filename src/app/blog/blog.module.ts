import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BlogPageRoutingModule } from './blog-routing.module';

import { BlogPage } from './blog.page';
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
    BlogPageRoutingModule
  ],
  declarations: [BlogPage]
})
export class BlogPageModule {}
