import { Injectable } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Store } from '@ngxs/store';
import { LogErrorEntry } from 'src/app/store/errors-logging/errors-logging.actions';
import { StrapiUserActions } from 'src/app/store/strapi-user/strapi-user.actions';

@Injectable({
    providedIn: 'root'
})
export class StrapiAuthInterceptor implements HttpInterceptor {
    tokenObservable: any;
    message: any = 'error message';
    constructor(
        public toastController: ToastController,
        private router: Router,
        private store: Store,
    ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler) {
        // const token = this.store.selectSnapshot<any>((state: any) => state.strapiUser?.token);
        // console.log(token);
        return this.store.dispatch(new StrapiUserActions.GetStrapiLoggedIn)
            .pipe(
                mergeMap((state: any) => {
                    const clonedReq = this.addToken(request, state.strapiUser.token);
                    return next.handle(clonedReq) || null;
                }),
                catchError((response: HttpErrorResponse) => throwError(response))
            );
    }
    private addToken(request: HttpRequest<any>, token: any) {
        if (token) {
            console.log(token);
            const clone: HttpRequest<any> = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            return clone;
        }
        return request;
    }
}
