import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { PasswordFormComponent } from './components/password-form/password-form.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { UserFormComponent } from './components/user-form/user-form.component';

@NgModule({
  declarations: [
    PasswordFormComponent,
    ProfileFormComponent,
    AddressFormComponent,
    LoginFormComponent,
    UserFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ReactiveFormsModule,
  ],
  exports: [
    PasswordFormComponent,
    ProfileFormComponent,
    AddressFormComponent,
    LoginFormComponent,
    UserFormComponent,
  ]
})
export class FormComponentsModule { }
