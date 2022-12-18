import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ErrorDialogService } from './error-dialog/error-dialog.service';
import { LoadingDialogService } from './loading/loading-dialog.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorCatchingInterceptor } from './errors/error-catching.interceptor';
import { IonicModule } from '@ionic/angular';
import { ErrorService } from './errors/server-error.service';

const sharedComponents: any[] = [];

@NgModule({
  declarations: [...sharedComponents],
  entryComponents: [...sharedComponents],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
  ],
  exports: [...sharedComponents],
  providers: [
    ErrorDialogService,
    LoadingDialogService,
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
})
export class ErrorsModule {}
