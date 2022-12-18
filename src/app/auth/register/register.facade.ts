import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthState } from 'src/app/store/auth/auth.state';

@Injectable({
    providedIn: 'root'
})
export class RegisterFacade {
    @Select(AuthState.getCustomer) customer$: Observable<any>;
    @Select(AuthState.getSession) session$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor(
        private store: Store,
    ) {
        this.viewState$ = combineLatest(
            [
                this.customer$,
            ]
        ).pipe(
            map(([
                customer,
            ]) => ({
                customer,
            }))
        );
    }
}
