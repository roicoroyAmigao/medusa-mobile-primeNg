import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LanguageComponent } from './language-component/language.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [
    LanguageComponent
  ],
  exports:[
    LanguageComponent
  ]
})
export class LanguageModule {}
