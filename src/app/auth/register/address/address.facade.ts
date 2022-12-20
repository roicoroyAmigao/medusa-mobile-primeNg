import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserState } from 'src/app/store/user/user.state';

@Injectable({
    providedIn: 'root'
})
export class AddressFacade {
    @Select(UserState.getCustomer) customer$: Observable<any>;
    @Select(UserState.getSession) session$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor(
        private store: Store,
    ) {
        this.viewState$ = combineLatest(
            [
                this.customer$,
                this.session$
            ]
        ).pipe(
            map(([
                customer,
                session
            ]) => ({
                customer,
                session
            }))
        );
    }
}
