import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CheckboxWrapperComponent } from './components/checkbox-wrapper/checkbox-wrapper.component';
import { CountdownTimerComponent } from './components/countdown-timer/countdown-timer.component';
import { CounterInputComponent } from './components/counter-input/counter-input.component';

import { RatingInputComponent } from './components/rating-input/rating-input.component';
import { ShowHidePasswordComponent } from './components/show-hide-password/show-hide-password.component';
import { ShellModule } from './components/shell/shell.module';
import { NgxsModule } from '@ngxs/store';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { CartMenuComponent } from './components/app-menu/cart-menu.component';
import { MedusaCartComponent } from './components/medusa-cart/medusa-cart.component';

@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ReactiveFormsModule,
    NgxsModule,
    NgxsFormPluginModule,
    ShellModule,
  ],
  declarations: [
    CheckboxWrapperComponent,
    ShowHidePasswordComponent,
    CountdownTimerComponent,
    CounterInputComponent,
    RatingInputComponent,
    CartMenuComponent,
    MedusaCartComponent,
  ],
  exports: [
    ShellModule,
    CheckboxWrapperComponent,
    ShowHidePasswordComponent,
    CountdownTimerComponent,
    CounterInputComponent,
    RatingInputComponent,
    CartMenuComponent,
    MedusaCartComponent,
  ]
})
export class ComponentsModule { }
