import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Store } from '@ngxs/store';
import { BehaviorSubject } from 'rxjs';
import { LogErrorEntry } from 'src/app/store/errors-logging/errors-logging.actions';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ErrorService implements ErrorHandler {

  public httpInteceptorErrors = new BehaviorSubject<any>(null);

  private store: Store;

  constructor(
    private readonly injector: Injector
  ) { }

  /**
   * @param error - client error
   */
  handleError(error: Error): void {
    // console.table(error);
    if (!environment.production) {
      // console.error(error);
    }
    if (this.store == null) {
      this.store = this.injector.get(Store);
    }

    // this.store.dispatch(new LogErrorEntry(error));
  }
}
