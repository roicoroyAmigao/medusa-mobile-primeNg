/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, combineLatest, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AuthState } from 'src/app/store/auth/auth.state';


@Injectable({
    providedIn: 'root'
})
export class OrdersFacade {

    @Select(AuthState.getCustomer) customer$: Observable<any>;
    @Select(AuthState.getSession) session$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor() {
        this.viewState$ = combineLatest(
            [
                this.customer$,
                this.session$,
            ]
        ).pipe(
            map(([
                customer,
                session,
            ]) => ({
                customer,
                session,
            }))
        );
    }
}
