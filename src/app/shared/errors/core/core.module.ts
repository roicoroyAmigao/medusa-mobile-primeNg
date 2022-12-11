import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { AuthInterceptor } from '../../auth.interceptor';
import { ErrorCatchingInterceptor } from './errors/error-catching.interceptor';
import { GlobalErrorHandler } from './errors/global-error-handler';
import { HttpLoadingInterceptor } from './errors/http-loading.interceptor';
import { ServerErrorInterceptor } from './errors/server-error.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    // {
    //   provide: ErrorHandler,
    //   useClass: GlobalErrorHandler,
    // },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HttpLoadingInterceptor,
    //   multi: true,
    // },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true
    // },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ServerErrorInterceptor,
    //   multi: true
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorCatchingInterceptor,
      multi: true
    }
  ],
})
export class CoreModule { }
