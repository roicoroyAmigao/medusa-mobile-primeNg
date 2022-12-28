import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { ErrorDialogService } from '../error-dialog/error-dialog.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private errorDialogService: ErrorDialogService,
    private zone: NgZone
  ) { }

  handleError(error: any) {
    console.log('GlobalErrorHandler', error);
    // // Check if it's an error from an HTTP response

    // if (!(error instanceof HttpErrorResponse)) {
    //   error = error.rejection; // get the error object
    // }
    // this.zone.run(async () =>

    //   await this.errorDialogService.openDialog(
    //     // error?.message || 'Undefined client error',
    //     error?.error.error?.message || 'Undefined client error', error?.status),
    // );

    // console.error('Error from global error handler', error);
  }
}
