import {
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { LoadingDialogService } from '../loading/loading-dialog.service';

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {

  constructor(
    private loadingDialogService: LoadingDialogService
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    this.loadingDialogService.openDialog();

    return next.handle(request).pipe(
      finalize(() => {
        setTimeout(() => {
          this.loadingDialogService.hideDialog();
        }, 50);
      }),
    ) as Observable<HttpEvent<any>>;
  }
}
