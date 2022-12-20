import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpRequest, HttpHandler,
    HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, Observable, ObservableInput, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {

    constructor(
        private utility: UtilityService,
    ) {
        // this.handleErrorService.AppErrors.subscribe((errors) => {
        //     console.log(errors);
        //     this.util.presentAlert(errors);
        // });
    }


    intercept(request: HttpRequest<any>, next: HttpHandler): any {
        // console.log('clonedReq', request);
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                return this.handleHttpError(error);
                // return null;
            }),
        );
    }

    private async handleHttpError(error: HttpErrorResponse): Promise<any> {
        // console.log('response', error);

        // if (error.status === 401) {
        //     await this.util.presentErrorAlert(error);
        //     this.serverErrors.httpInteceptorErrors.next(error);
        // }
        // if (error.status === 422) {
        //     await this.util.presentErrorAlert(error);
        //     this.serverErrors.httpInteceptorErrors.next(error);
        // }
        // if (error.status === 500) {
        //     await this.util.presentErrorAlert(error);
        //     this.serverErrors.httpInteceptorErrors.next(error);
        // }
        // else {
        //     this.serverErrors.httpInteceptorErrors.next(error);
        //     await this.util.presentErrorAlert(error);
        //     return throwError(error);
        // }
    }
}