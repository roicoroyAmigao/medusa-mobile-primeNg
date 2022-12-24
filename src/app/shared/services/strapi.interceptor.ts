import { Injectable } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Store } from '@ngxs/store';

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
        const token = this.store.selectSnapshot<any>((state: any) => state.strapiUser?.token);
        console.log(token);

        return token;
        // return this.storage.getKeyAsObservable('token').pipe(
        //     mergeMap(token => {
        //         const clonedReq = this.addToken(request, token);
        //         return next.handle(clonedReq) || null;
        //     }),
        //     catchError((response: HttpErrorResponse) => throwError(response))
        // );
    }
    private addToken(request: HttpRequest<any>, token: any) {
        if (token) {
            // console.log(token);
            const clone: HttpRequest<any> = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            return clone;
        }
        // if (!token) {
        //     this.router.navigateByUrl('/auth/login');
        // }
        return request;
    }
}
