import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserState } from '../store/medusa-user/user.state';

@Injectable({
    providedIn: 'root'
})
export class HomeFacade {

    @Select(UserState.getCustomer) customer$: Observable<any>;
    @Select(UserState.isLoggedIn) isLoggedIn$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor() {
        this.viewState$ = combineLatest(
            [
                this.customer$,
                this.isLoggedIn$,
            ]
        ).pipe(
            map((
                [
                    customer,
                    isLoggedIn
                ]
            ) => ({
                customer,
                isLoggedIn
            }))
        );
    }
}
