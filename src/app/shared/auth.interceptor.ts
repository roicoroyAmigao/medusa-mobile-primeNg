/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { IonStorageService } from './services/ionstorage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
    constructor(
    ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): any {
        const clonedReq = this.medusaRequest(request);
        return next.handle(clonedReq).subscribe(
            (event: HttpEvent<any>) => {},
            (error: HttpErrorResponse) => {
                console.log('error', error);
                if (error.status === 401) {
                    // refresh token
                } else {
                    return throwError(error);
                }
            }
        );
    }
    private medusaRequest(request: HttpRequest<any>) {
        // console.log('request', request);
        return request;
    }
}
