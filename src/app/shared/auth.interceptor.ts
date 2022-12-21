import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

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
                    return throwError(()=>{
                        return new Error(error.message);
                    });
                }
            }
        );
    }
    private medusaRequest(request: HttpRequest<any>) {
        // console.log('request', request);
        return request;
    }
}
