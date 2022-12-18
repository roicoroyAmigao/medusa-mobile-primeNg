import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddressFormComponent } from './address-form/address-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { PasswordFormComponent } from './password-form/password-form.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { UserFormComponent } from './user-form/user-form.component';
import { ComponentsModule } from './components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TranslateModule,
        NgxsModule,
        NgxsFormPluginModule,
        NgxsStoragePluginModule,
        ReactiveFormsModule,
        ComponentsModule
    ],
    providers: [
    ],
    declarations: [
        PasswordFormComponent,
        ProfileFormComponent,
        AddressFormComponent,
        LoginFormComponent,
        UserFormComponent,
    ],
    exports: [
        ComponentsModule,
        PasswordFormComponent,
        ProfileFormComponent,
        AddressFormComponent,
        LoginFormComponent,
        UserFormComponent,
    ]
})
export class FormComponentsModule { }
