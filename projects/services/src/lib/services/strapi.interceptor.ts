import { Injectable } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Store } from '@ngxs/store';


@Injectable({
    providedIn: 'root'
})
export class StrapiAuthInterceptor implements HttpInterceptor {
    constructor(
        private store: Store,
    ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler) {
        // return this.store.dispatch(new StrapiUserActions.GetStrapiLoggedIn)
        //     .pipe(
        //         mergeMap((state: any) => {
        //             // console.log(state.strapiUser.token);
        //             const clonedReq = this.addToken(request, state.strapiUser.token);
        //             return next.handle(clonedReq) || null;
        //         }),
        //         catchError((response: HttpErrorResponse) => throwError(() => {
        //             this.store.dispatch(new LogErrorEntry(response));
        //             new Error(response.message);
        //         }))
        //     );
        return next.handle(request);
    }
    private addToken(request: HttpRequest<any>, token: any) {
        if (token) {
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
