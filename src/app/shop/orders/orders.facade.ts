/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, combineLatest, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { UserState } from 'src/app/store/medusa-user/user.state';


@Injectable({
    providedIn: 'root'
})
export class OrdersFacade {

    @Select(UserState.getCustomer) customer$: Observable<any>;
    @Select(UserState.getSession) session$: Observable<any>;

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
