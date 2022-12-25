import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserState } from 'src/app/store/medusa-user/user.state';

@Injectable({
    providedIn: 'root'
})
export class StrapiAddressFacade {
    // @Select(UserState.getCustomer) customer$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor(
        private store: Store,
    ) {
        this.viewState$ = combineLatest(
            [
                // this.customer$,
            ]
        ).pipe(
            map((
                // [
                //     customer,
                // ]
            ) => ({
                // customer,
            }))
        );
    }
}
