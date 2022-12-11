/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, combineLatest, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AuthState } from 'src/app/store/auth/auth.state';
import { MedusaState } from 'src/app/store/medusa/medusa.state';

@Injectable({
    providedIn: 'root'
})
export class AddressesFacade {

    @Select(AuthState.getCustomer) customer$: Observable<any>;
    @Select(AuthState.getSession) session$: Observable<any>;
    @Select(MedusaState.getCartId) cartId$: Observable<any>;
    @Select(MedusaState.getCart) cart$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor(
        private store: Store,
    ) {
        this.viewState$ = combineLatest(
            [
                this.customer$,
                this.session$,
                this.cartId$,
                this.cart$,
            ]
        ).pipe(
            map(([
                customer,
                session,
                cartId,
                cart,
            ]) => ({
                customer,
                session,
                cartId,
                cart,
            }))
        );
    }
}

