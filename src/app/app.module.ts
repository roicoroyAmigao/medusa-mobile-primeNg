import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// import { NZ_I18N } from 'ng-zorro-antd/i18n';
// import { uk_UA } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MedusaState } from './store/medusa/medusa.state';
import localePT from '@angular/common/locales/pt';
import localeEN from '@angular/common/locales/en';
import localeUK from '@angular/common/locales/uk';
import { AuthState } from './store/auth/auth.state';
import { TruncatePipe } from './shared/pipes/truncate.pipe';
import { AddressesState } from './store/addresses/addresses.state';
import { FormsState } from './store/forms/forms.state';
import { RegisterState } from './store/register/register.state';
import { ErrorsModule } from './shared/errors/errors.module';
import { ErrorsLoggingStateModule } from './store/errors-logging/errors-logging.state';
import { ErrorCatchingInterceptor } from './shared/errors/errors/error-catching.interceptor';
import { ErrorService } from './shared/errors/errors/server-error.service';
import { ProductState } from './store/products/products.state';

registerLocaleData(localePT, 'pt');
registerLocaleData(localeEN, 'en');
registerLocaleData(localeUK, 'uk');

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    // AddressesComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
      defaultLanguage: 'en'
    }),
    NgxsModule.forRoot([
      MedusaState,
      AuthState,
      FormsState,
      AddressesState,
      RegisterState,
      ErrorsLoggingStateModule,
      ProductState
    ]),
    NgxsFormPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: false
    }),
    NgxsLoggerPluginModule.forRoot({ disabled: true }),
    NgxsStoragePluginModule.forRoot({
      key: [
        'medusa',
        "addresses",
        'auth',
        'forms'
      ]
    }),
    ReactiveFormsModule,
    // ErrorsModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // { provide: NZ_I18N, useValue: uk_UA },
    { provide: LOCALE_ID, useValue: 'en' },
    {
      provide: ErrorHandler,
      useClass: ErrorService,
      multi: false
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorCatchingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
