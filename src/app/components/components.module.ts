import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddressFormComponent } from './address-form/address-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { PasswordFormComponent } from './password-form/password-form.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { ProgressBarModule } from 'primeng/progressbar';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SliderModule } from 'primeng/slider';
import { SplitterModule } from 'primeng/splitter';
import { StyleClassModule } from 'primeng/styleclass';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { OrderListModule } from 'primeng/orderlist';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DataViewModule } from 'primeng/dataview';
// 
import { TranslateModule } from '@ngx-translate/core';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { UserFormComponent } from './user-form/user-form.component';
import { AddressDetailsComponent } from '../shop/addresses/address-details/address-details.component';
import { AddressesComponent } from '../shop/addresses/addresses.component';
import { AddressBillingDetailsComponent } from '../shop/addresses/billing-address-details/billing-address-details.component';


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
        // 
        AutoCompleteModule,
        ButtonModule,
        CardModule,
        CheckboxModule,
        DataViewModule,
        DialogModule,
        DropdownModule,
        FieldsetModule,
        InputTextModule,
        MessageModule,
        MessagesModule,
        PanelModule,
        RatingModule,
        RippleModule,
        SplitterModule,
        StyleClassModule,
        ToastModule,
        TooltipModule,
        ButtonModule,
        PasswordModule,
        TableModule,
        CalendarModule,
        SliderModule,
        DialogModule,
        MultiSelectModule,
        ContextMenuModule,
        DropdownModule,
        ButtonModule,
        ToastModule,
        InputTextModule,
        ProgressBarModule,
        OrderListModule,
        FileUploadModule,
        ToolbarModule,
        RadioButtonModule,
        InputNumberModule,
        ConfirmDialogModule,
        InputTextareaModule,
        DataViewModule
    ],
    providers: [
        ConfirmationService,
        MessageService,
    ],
    declarations: [
        PasswordFormComponent,
        ProfileFormComponent,
        AddressFormComponent,
        LoginFormComponent,
        UserFormComponent,
        AddressesComponent,
        AddressDetailsComponent,
        AddressBillingDetailsComponent,

    ],
    exports: [
        PasswordFormComponent,
        ProfileFormComponent,
        AddressFormComponent,
        LoginFormComponent,
        UserFormComponent,
        AddressesComponent,
        AddressDetailsComponent,
        AddressBillingDetailsComponent,
        // 
        AutoCompleteModule,
        ButtonModule,
        CardModule,
        CheckboxModule,
        DataViewModule,
        DialogModule,
        DropdownModule,
        FieldsetModule,
        InputTextModule,
        MessageModule,
        MessagesModule,
        PanelModule,
        RatingModule,
        RippleModule,
        SplitterModule,
        StyleClassModule,
        ToastModule,
        TooltipModule,
        ButtonModule,
        PasswordModule,
        TableModule,
        CalendarModule,
        SliderModule,
        DialogModule,
        MultiSelectModule,
        ContextMenuModule,
        DropdownModule,
        ButtonModule,
        ToastModule,
        InputTextModule,
        ProgressBarModule,
        OrderListModule,
        FileUploadModule,
        ToolbarModule,
        RadioButtonModule,
        InputNumberModule,
        ConfirmDialogModule,
        InputTextareaModule,
        DataViewModule
    ]
})
export class ComponentsModule { }
